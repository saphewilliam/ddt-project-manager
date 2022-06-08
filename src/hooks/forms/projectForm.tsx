import useForm, { Field, State } from '@saphe/react-form';
import { useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { ProjectType } from '@graphql/__generated__/codegen-self';
import useSafeQuery from '@hooks/useSafeQuery';
import useSdk from '@hooks/useSdk';
import { projectTypeToString, promiseWithCatch } from '@lib/util';

export default function useProjectForm(): State {
  const sdk = useSdk();

  const { data: usersData } = useSafeQuery('useUsers', {});
  const usersOptions = useMemo(
    () =>
      usersData?.users.map((user) => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`,
      })) ?? [],
    [usersData],
  );

  const { data: subthemesData } = useSafeQuery('useSubthemes', {});
  const subthemesOptions = useMemo(
    () =>
      subthemesData?.subthemes.map((subtheme) => ({
        value: subtheme.id,
        label: `${subtheme.event.name} - ${subtheme.name}`,
      })) ?? [],
    [subthemesData],
  );

  return useForm({
    name: 'ProjectForm',
    fields: {
      ProjectNumberField: {
        type: Field.NUMBER,
        label: 'Project number',
        placeholder: 'E.g. 1',
        validation: { required: 'Please fill out a value.' },
      },
      ProjectSubNumberField: {
        type: Field.NUMBER,
        label: 'Project subnumber',
        placeholder: 'E.g. a',
        validation: { required: 'Please fill out a value.' },
      },
      ProjectNameField: {
        type: Field.TEXT,
        label: 'Project name',
        placeholder: 'E.g.',
        validation: { required: 'Please fill out a value.' },
      },
      ProjectDescriptionField: {
        type: Field.TEXT_AREA,
        label: 'Project description',
        validation: { required: 'Please fill out a value.' },
      },
      ProjectTypeField: {
        type: Field.SELECT,
        label: 'Select type',
        placeholder: 'Choose a type from the list.',
        options: Object.keys(ProjectType).map((type) => ({
          label: projectTypeToString(type as ProjectType),
          value: type,
        })),
        validation: { required: 'Please choose a supervisor from the list.' },
      },
      ProjectSubthemeNameField: {
        type: Field.SELECT,
        label: 'Select subtheme',
        placeholder: 'Choose a subtheme from the list.',
        options: subthemesOptions,
        validation: { required: 'Please choose a subtheme from the list.' },
      },
      ProjectSupervisorField: {
        type: Field.SELECT,
        label: 'Select supervisor',
        placeholder: 'Choose a supervisor from the list.',
        options: usersOptions,
        validation: { required: 'Please choose a supervisor from the list.' },
      },
    },
    async onSubmit(formValues) {
      const data = await promiseWithCatch(
        sdk.CreateProject({
          data: {
            name: formValues.ProjectNameField,
            description: formValues.ProjectDescriptionField,
            projectType: formValues.ProjectTypeField as ProjectType,
            supervisorId: formValues.ProjectSupervisorField,
            subthemeId: formValues.ProjectSubthemeNameField,
            number: formValues.ProjectNumberField,
            subNumber: formValues.ProjectSubNumberField,
          },
        }),
        'Something went wrong while creating the project...',
      );
      if (!data) return;

      toast.success(`Project '${data.createProject.name}' was created`);
    },
  });
}
