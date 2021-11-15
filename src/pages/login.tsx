import cx from 'clsx';
import { GraphQLClient } from 'graphql-request';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FormEvent, ReactElement, useCallback, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Button from '@components/Button';
import { getSdk, getTeamsQuery } from '@graphql/__generated__/codegen-self';
import { displayError } from '@hooks/useDisplayError';
import useSession from '@hooks/useSession';
import { environment } from '@lib/environment';
import { promiseWithCatch } from '@lib/util';

interface FormValues {
  email: string;
  password: string;
  isPermanent: boolean;
}

const initialFormValues: FormValues = {
  email: '',
  password: '',
  isPermanent: false,
};

export default function LoginPage(): ReactElement {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [showTeams, setShowTeams] = useState(false);
  const [teams, setTeams] = useState<getTeamsQuery | null>(null);
  const [team, setTeam] = useState('');
  const [loading, setLoading] = useState(true);
  const [cookie, setCookie, removeCookie] = useCookies(['ddtauth']);

  const router = useRouter();
  const { session } = useSession();

  const setSessionTeam = useCallback(
    async (teamId: string, token?: string) => {
      const client = new GraphQLClient(environment.endpoints.self, {
        headers: { authorization: `Bearer ${token ?? cookie.ddtauth}` },
      });

      const sdk = getSdk(client);

      const data = await promiseWithCatch(sdk.setSessionTeam({ teamId }), 'Could not select team');
      if (!data) {
        setLoading(false);
        return;
      }

      router.push('/');
    },
    [cookie.ddtauth],
  );

  const getSessionTeams = useCallback(
    async (token?: string) => {
      const sdk = getSdk(new GraphQLClient(environment.endpoints.self));
      const data = await promiseWithCatch(
        sdk.getTeams({}, { Authorization: `Bearer ${token ?? cookie.ddtauth}` }),
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

  async function handleLoginSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    setLoading(true);
    const sdk = getSdk(new GraphQLClient(environment.endpoints.self));
    const data = await promiseWithCatch(sdk.login(formValues), 'Failed to log in');
    if (!data) {
      setLoading(false);
      return;
    }

    const expireDate = new Date();
    expireDate.setFullYear(expireDate.getFullYear() + 5);
    setCookie('ddtauth', data.login, { path: '/', expires: expireDate });

    await getSessionTeams(data.login);

    setLoading(false);
  }

  async function handleTeamSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setLoading(true);
    setSessionTeam(team);
  }

  // Detect teamless tokens on page load
  useEffect(() => {
    if (session !== null && !showTeams) getSessionTeams();
    else setLoading(false);
  }, [session]);

  return (
    <div className={cx('w-screen', 'h-screen', 'flex')}>
      <Head>
        <title>DDT Project Manager - Login</title>
      </Head>
      <div className={cx('w-7/12', 'bg-dark')}>
        <div className={cx('w-full', 'h-full', 'relative')}>
          <Image src="/img/login_bg.jpg" alt="Login Background" layout="fill" objectFit="cover" />
        </div>
        {/* <div>
        </div>
        <Image
          className={cx()}
          src="/img/logo.png"
          alt="Dutch Domino Team Logo"
          width="300"
          height="95"
        /> */}
      </div>
      <div className={cx('flex-grow', 'flex', 'flex-col', 'justify-center', 'items-center')}>
        <div className={cx('w-7/12')}>
          <h1 className={cx('font-bold', 'text-4xl', 'mb-4')}>Sign in</h1>
          <p className={cx('font-semibold', 'text-muted')}>Sign in to the DDT Project Manager</p>

          <hr className={cx('my-8', 'text-muted')} />

          {showTeams ? (
            <form onSubmit={handleTeamSubmit} className={cx('flex', 'flex-col')}>
              <div className={cx('flex', 'flex-col', 'mb-4')}>
                <label htmlFor="team">Team</label>
                <select id="team" value={team} onChange={(e) => setTeam(e.target.value)}>
                  <option value="" disabled>
                    Select a team
                  </option>
                  {teams?.teams.map((team) => (
                    <option value={team.id} key={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
              <Button label="Select team" loading={loading} />
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit} className={cx('flex', 'flex-col', 'space-y-4')}>
              <div className={cx('flex', 'flex-col')}>
                <label htmlFor="email" className={cx('mb-1')}>
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="@mail.com"
                  onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                  value={formValues.email}
                />
              </div>
              <div className={cx('flex', 'flex-col')}>
                <label htmlFor="password" className={cx('mb-1')}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                  value={formValues.password}
                />
              </div>
              <div className={cx('flex', 'justify-between')}>
                <label htmlFor="remember">
                  <input
                    className={cx('mr-2')}
                    type="checkbox"
                    id="remember"
                    onChange={(e) =>
                      setFormValues({ ...formValues, isPermanent: e.target.checked })
                    }
                    checked={formValues.isPermanent}
                  />
                  Remember me
                </label>
                {/* <Link href="/todo">
                <a>Forgot password?</a>
              </Link> */}
              </div>
              <Button label="Sign in" loading={loading} />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
