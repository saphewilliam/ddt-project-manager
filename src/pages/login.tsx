import useForm, { Field } from '@saphe/react-form';
import cx from 'clsx';
import { GraphQLClient } from 'graphql-request';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ReactElement, useCallback, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import FormFields from '@components/FormFields';
import { getSdk, TeamsQuery } from '@graphql/__generated__/codegen-self';
import { displayError } from '@hooks/useDisplayError';
import useSession from '@hooks/useSession';
import { environment } from '@lib/environment';
import { promiseWithCatch } from '@lib/util';

export default function LoginPage(): ReactElement {
  const [showTeams, setShowTeams] = useState(false);
  const [teams, setTeams] = useState<TeamsQuery | null>(null);
  const [cookie, setCookie, removeCookie] = useCookies(['ddtauth']);

  const router = useRouter();
  const { session } = useSession();

  const { form: loginForm } = useForm({
    name: 'loginForm',
    fieldPack: FormFields,
    fields: {
      email: {
        type: Field.EMAIL,
        placeholder: '@mail.com',
        validation: { required: 'Please enter your email' },
      },
      password: {
        type: Field.PASSWORD,
        placeholder: 'Password',
        validation: { required: 'Please enter your password' },
      },
      isPermanent: {
        type: Field.CHECK,
        label: 'Remember me',
        initialValue: true,
      },
    },
    async onSubmit(formValues) {
      const sdk = getSdk(new GraphQLClient(environment.endpoints.self));
      const data = await promiseWithCatch(sdk.Login(formValues), 'Failed to log in');
      if (!data) return;

      const expireDate = new Date();
      expireDate.setFullYear(expireDate.getFullYear() + 5);
      setCookie('ddtauth', data.login, { path: '/', expires: expireDate });

      await getSessionTeams(data.login);
    },
  });

  const { form: teamForm } = useForm({
    name: 'teamForm',
    fieldPack: FormFields,
    fields: {
      team: {
        type: Field.SELECT,
        options: teams?.teams.map((team) => ({ value: team.id, label: team.name })) ?? [],
        placeholder: 'Select a team',
        validation: { required: 'Please select a team' },
      },
    },
    async onSubmit({ team }) {
      await setSessionTeam(team);
    },
  });

  const setSessionTeam = useCallback(
    async (teamId: string, token?: string) => {
      const client = new GraphQLClient(environment.endpoints.self, {
        headers: { authorization: `Bearer ${token ?? cookie.ddtauth}` },
      });

      const sdk = getSdk(client);

      const data = await promiseWithCatch(sdk.SetSessionTeam({ teamId }), 'Could not select team');
      if (!data) return;

      router.push('/');
    },
    [cookie.ddtauth],
  );

  const getSessionTeams = useCallback(
    async (token?: string) => {
      const sdk = getSdk(new GraphQLClient(environment.endpoints.self));
      const data = await promiseWithCatch(
        sdk.Teams({}, { Authorization: `Bearer ${token ?? cookie.ddtauth}` }),
        'Could not fetch teams',
      );
      if (!data) return;

      if (data.teams.length === 0) {
        displayError(`Failed to log in: ${session?.user.displayName} is not a member of any teams`);
        removeCookie('ddtauth');
      } else if (data.teams.length === 1) {
        const teamId = data.teams[0]?.id;
        if (!teamId) return;
        await setSessionTeam(teamId, token);
      } else {
        setTeams(data);
        setShowTeams(true);
      }
    },
    [cookie.ddtauth, session],
  );

  // Detect teamless tokens on page load
  useEffect(() => {
    if (session !== null && !showTeams) getSessionTeams();
  }, [session]);

  return (
    <div className={cx('w-screen', 'h-screen', 'flex')}>
      <Head>
        <title>DDT Project Manager - Login</title>
      </Head>
      <div className={cx('w-7/12', 'bg-gray-900')}>
        <div className={cx('w-full', 'h-full', 'relative')}>
          <Image
            priority
            src="/img/login_bg.jpg"
            alt="Login Background"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className={cx('grow', 'flex', 'flex-col', 'justify-center', 'items-center')}>
        <div className={cx('w-7/12')}>
          <h1 className={cx('font-bold', 'text-4xl', 'mb-4')}>Sign in</h1>
          <p className={cx('font-semibold', 'text-gray')}>Sign in to the DDT Project Manager</p>
          <hr className={cx('my-8', 'text-gray')} />
          {showTeams ? teamForm : loginForm}
        </div>
      </div>
    </div>
  );
}
