import useSdk from '@hooks/useSdk';
import { useAsyncReducer } from '@saphe/react-use';
import cx from 'clsx';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { EditorProps } from 'react-draft-wysiwyg';
import { toast } from 'react-hot-toast';
import Button, { ButtonType } from '@components/Button';
import { ProjectQuery, useProjectQuery } from '@graphql/Project/__generated__/queries';
import { extractURLParam, promiseWithCatch } from '@lib/util';
import styles from './editor.module.scss';
import { GeneralPanelSection } from './GeneralPanel';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useUpdateProjectMutation } from '@graphql/Project/__generated__/mutations';

const Editor = dynamic<EditorProps>(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
});

export default function DescriptionSection(): ReactElement {
  const router = useRouter();
  const projectSlug = extractURLParam('projectSlug', router.query);
  const [projectQuery, refetchProject] = useProjectQuery({
    variables: { where: { slug: projectSlug } },
  });
  const [updateProject] = useUpdateProjectMutation();

  const initialState = {
    isEditing: false,
    isSubmitting: false,
    value: props.project.description
      ? EditorState.createWithContent(convertFromRaw(props.project.description))
      : EditorState.createEmpty(),
  };

  const { state, actions, isLoading } = useAsyncReducer(initialState, {
    reset: () => initialState,
    startEditing: () => ({ ...initialState, isEditing: true }),
    change: (prevState, targetValue: EditorState) => ({ ...prevState, value: targetValue }),
    save: async (prevState) => {
      const content = convertToRaw(prevState.value.getCurrentContent());
      const isEmpty = content.blocks.reduce((prev, curr) => prev && curr.text.trim() === '', true);
      const project = projectQuery.data?.project;

      const updatedProject = await promiseWithCatch(
        updateProject({
          id: project.id,
          data: {
            name: { set: project.name },
            status: { set: project.status },
            subthemeId: project.subtheme.id,
            supervisorId: project.supervisor?.id ?? null,
            parts: project.parts.map((part) => ({
              id: part.id,
              name: part.name,
              number: part.number,
              description: part.description,
              type: part.type,
            })),
            description: isEmpty ? null : content,
          },
        }),
        'Error while updating project',
      );

      if (updatedProject?.data?.updateProject) {
        refetchProject();
        toast.success(`Successfully updated ${updatedProject.data.updateProject.name}`);
      }
      return { ...prevState, isEditing: false };
    },
  });

  const className = cx('!rounded-md', '!shadow-none', '!h-6', 'hover:bg-gray-50');

  return (
    <GeneralPanelSection title="Description" {...state} {...props} {...actions}>
      {state.isEditing ? (
        <>
          <Editor
            wrapperClassName={cx('border', 'rounded-md', 'mt-3', styles['editor'])}
            toolbarClassName={cx('!border-x-0', '!border-t-0', '!bg-transparent')}
            editorClassName={cx('px-4', '-mt-2', '-mb-1')}
            editorState={state.value}
            onEditorStateChange={(state) => actions.change(state)}
            toolbar={{
              options: ['inline', 'list', 'link', 'emoji', 'history'],
              inline: {
                options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                bold: { icon: '/icons/type-bold.svg', className },
                italic: { icon: '/icons/type-italic.svg', className },
                underline: { icon: '/icons/type-underline.svg', className },
                strikethrough: { icon: '/icons/type-strikethrough.svg', className },
                monospace: { icon: '/icons/code-slash.svg', className },
              },
              list: {
                unordered: { icon: '/icons/list-ul.svg', className },
                ordered: { icon: '/icons/list-ol.svg', className },
                indent: { icon: '/icons/text-indent-left.svg', className },
                outdent: { icon: '/icons/text-indent-right.svg', className },
              },
              link: {
                options: ['link'],
                link: { icon: '/icons/link-45deg.svg', className },
              },
              emoji: { icon: '/icons/emoji-smile.svg', className },
              history: {
                undo: { icon: '/icons/arrow-counterclockwise.svg', className },
                redo: { icon: '/icons/arrow-clockwise.svg', className },
              },
            }}
          />
          <div className={cx('mt-4', 'flex', 'space-x-3')}>
            <Button label="Save description" loading={isLoading} onClick={() => actions.save()} />
            <Button
              label="Cancel"
              loading={isLoading}
              buttonType={ButtonType.EMPTY}
              onClick={() => actions.reset()}
            />
          </div>
        </>
      ) : projectQuery.data?.project?.description ? (
        <div
          className={styles['edited']}
          dangerouslySetInnerHTML={{ __html: draftToHtml(projectQuery.data.project.description) }}
        />
      ) : (
        <p>No description found</p>
      )}
    </GeneralPanelSection>
  );
}
