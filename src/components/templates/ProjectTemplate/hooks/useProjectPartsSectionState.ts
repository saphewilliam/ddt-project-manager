import { useAsyncReducer } from '@saphe/react-use';
import { nanoid } from 'nanoid';
import { useSWRConfig } from 'swr';
import { ProjectQuery, ProjectType } from '@graphql/__generated__/codegen-self';
import useSdk from '@hooks/useSdk';

export default function useProjectPartsSectionState(
  project: NonNullable<ProjectQuery['project']>,
  swrKey: string,
) {
  const sdk = useSdk();
  const { mutate } = useSWRConfig();

  const initialState = {
    parts: project.parts,
    showDeleteWarning: false,
    showTypeWarning: false,
    isEditing: false,
    canSubmit: true,
  };

  return useAsyncReducer(initialState, {
    startEditing: () => ({ ...initialState, isEditing: true }),
    reset: () => initialState,
    drop: (prevState, srcId: number, destId: number) => {
      const newParts = [...prevState.parts];
      const item = newParts.splice(srcId, 1)[0];
      if (!item) return prevState;

      newParts.splice(destId, 0, item);
      return { ...prevState, parts: newParts.map((part, idx) => ({ ...part, number: idx + 1 })) };
    },
    delete: (prevState, id: string) => {
      const parts = prevState.parts
        .filter((part) => part.id !== id)
        .map((part, idx) => ({ ...part, number: idx + 1 }));
      return {
        ...prevState,
        showDeleteWarning:
          prevState.showDeleteWarning || project.parts.find((part) => part.id === id) !== undefined,
        showTypeWarning: parts.reduce<boolean>(
          (prev, curr) => prev || curr.type !== project.parts.find((p) => p.id === curr.id)?.type,
          false,
        ),
        canSubmit: !parts.reduce<boolean>(
          (prev, curr) => prev || (curr.id !== id && curr.name === ''),
          false,
        ),
        parts,
      };
    },
    add: (prevState) => ({
      ...prevState,
      canSubmit: false,
      parts: [
        ...prevState.parts,
        {
          id: nanoid(),
          name: '',
          description: null,
          stones: [],
          attributes: [],
          number: prevState.parts.length + 1,
          type: ProjectType.OTHER,
        },
      ],
    }),
    changeName: (prevState, id: string, targetValue: string) => ({
      ...prevState,
      canSubmit:
        targetValue !== '' &&
        !prevState.parts.reduce<boolean>(
          (prev, curr) => prev || (curr.id !== id && curr.name === ''),
          false,
        ),
      parts: prevState.parts.map((part) =>
        part.id === id ? { ...part, name: targetValue } : part,
      ),
    }),
    changeType: (prevState, id: string, targetValue: ProjectType) => {
      const part = project.parts.find((part) => part.id === id);
      return {
        ...prevState,
        showTypeWarning:
          (part !== undefined && part.type !== targetValue) ||
          prevState.parts.reduce<boolean>((prev, curr) => {
            const part = project.parts.find((p) => p.id === curr.id);
            return prev || (part !== undefined && part.id !== id && curr.type !== part.type);
          }, false),
        parts: prevState.parts.map((part) =>
          part.id === id ? { ...part, type: targetValue } : part,
        ),
      };
    },
    save: async (prevState) => {
      await sdk.UpdateProject({
        id: project.id,
        data: {
          status: project.status,
          subthemeId: project.subtheme.id,
          supervisorId: project.supervisor?.id ?? null,
          parts: prevState.parts.map((part) => ({
            id: part.id,
            name: part.name,
            description: part.description,
            number: part.number,
            type: part.type,
          })),
          description: project.description,
        },
      });
      await mutate(swrKey);
      return { ...prevState, isEditing: false };
    },
  });
}
