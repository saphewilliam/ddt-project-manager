import useForm, { Field } from '@saphe/react-form';
import { useAsyncReducer } from '@saphe/react-use';
import cx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactElement, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import Button, { ButtonType } from '@components/Button';
import FormFields from '@components/FormFields';
import ProjectStatusBadge, {
  getProjectStatusBadgeText,
  projectStatuses,
} from '@components/ProjectStatusBadge';
import { ProjectQuery, ProjectStatus } from '@graphql/__generated__/codegen-self';
import useSafeQuery from '@hooks/useSafeQuery';
import useSdk from '@hooks/useSdk';
import { promiseWithCatch } from '@lib/util';
import { GeneralPanelSection } from './GeneralPanel';

export interface Props {
  project: NonNullable<ProjectQuery['project']>;
  swrKey: string;
}

export default function InfoSection(props: Props): ReactElement {
  const router = useRouter();
  const sdk = useSdk();
  const { mutate } = useSWRConfig();

  const { data: usersData } = useSafeQuery('useUsers', {});
  const { data: subthemesData } = useSafeQuery('useSubthemes', {});

  const usersOptions = useMemo(
    () =>
      usersData?.users.map((user) => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`,
      })) ?? [],
    [usersData],
  );

  const subthemesOptions = useMemo(
    () =>
      subthemesData?.subthemes.map((subtheme) => ({
        value: subtheme.id,
        label: `${subtheme.event.name} - ${subtheme.name}`,
      })) ?? [],
    [subthemesData],
  );

  const initialState = {
    isEditing: false,
  };

  const { state, actions } = useAsyncReducer(initialState, {
    startEditing: () => ({ ...initialState, isEditing: true }),
    reset: () => initialState,
  });

  const { form, submitButton, formState } = useForm({
    name: 'projectInfoForm',
    fieldPack: FormFields,
    submitButton: { label: 'Save information', hidden: true },
    fields: {
      name: {
        type: Field.TEXT,
        initialValue: props.project.name,
        validation: { required: 'Please enter a name' },
      },
      supervisorId: {
        type: Field.SELECT,
        label: 'Supervisor',
        initialValue: props.project.supervisor?.id,
        validation: { required: 'Please choose a project supervisor' },
        options: usersOptions,
      },
      subthemeId: {
        type: Field.SELECT,
        label: 'Subtheme',
        initialValue: props.project.subtheme.id,
        validation: { required: 'Please choose a subtheme' },
        options: subthemesOptions,
      },
      status: {
        type: Field.SELECT,
        initialValue: props.project.status,
        validation: { required: 'Please choose a project status' },
        options: projectStatuses.map((status) => ({
          // TODO pass props (bg color) through here?
          label: getProjectStatusBadgeText(status).label,
          value: status,
        })),
      },
    },
    async onSubmit(formValues) {
      const newProject = await promiseWithCatch(
        sdk.UpdateProject({
          id: props.project.id,
          data: {
            name: formValues.name,
            subthemeId: formValues.subthemeId,
            supervisorId: formValues.supervisorId,
            status: formValues.status as ProjectStatus,
            description: props.project.description,
            parts: props.project.parts.map((part) => ({
              id: part.id,
              name: part.name,
              number: part.number,
              description: part.description,
              type: part.type,
            })),
          },
        }),
        'Error while updating project',
      );
      if (!newProject) return;
      if (newProject.updateProject) {
        await mutate(props.swrKey);
        // FIXME changing events leads to endless loading screen
        // TODO only mutate event if slug / events slug has changed
        await mutate(`useEvent${newProject.updateProject.subtheme.event.slug}`);
        toast.success(`Successfully updated ${newProject.updateProject.name}`);
        actions.reset();
        router.replace(
          `/events/${newProject.updateProject.subtheme.event.slug}/${newProject.updateProject.slug}`,
        );
      }
    },
  });

  return (
    <GeneralPanelSection title="General information" {...props} {...state} {...actions}>
      {state.isEditing ? (
        <>
          {form}
          <div className={cx('flex', 'space-x-3')}>
            {submitButton}
            <Button
              label="Cancel"
              buttonType={ButtonType.EMPTY}
              loading={formState.isLoading}
              onClick={() => actions.reset()}
            />
          </div>
        </>
      ) : (
        <ul>
          <li>
            <span className={cx('font-bold')}>Supervisor: </span>
            {props.project.supervisor ? (
              props.project.supervisor.displayName
            ) : (
              <span className={cx('italic')}>~deleted user~</span>
            )}
          </li>
          <li>
            <span className={cx('font-bold')}>Subtheme: </span>
            {props.project.subtheme.name} ({props.project.subtheme.event.name})
          </li>
          <li>
            <ProjectStatusBadge status={props.project.status} />
          </li>
        </ul>
      )}
    </GeneralPanelSection>
  );
}
