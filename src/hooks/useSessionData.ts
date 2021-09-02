import { getSdk, getSessionQuery } from '@graphql/__generated__/codegen-self';
import { GraphQLClient } from 'graphql-request';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { environment } from '@lib/environment';
import { promiseWithCatch } from '@lib/util';

export default function useSessionData(): getSessionQuery['session'] {
  const router = useRouter();
  const [session, setSession] = useState<getSessionQuery['session']>(null);
  const [cookie, , removeCookie] = useCookies(['ddtauth']);

  useEffect(() => {
    if (!cookie.ddtauth && router.pathname !== '/login') router.push('/login');
    if (cookie.ddtauth) {
      const getSession = async () => {
        const sdk = getSdk(new GraphQLClient(environment.endpoints.self));
        const data = await promiseWithCatch(
          sdk.getSession({ token: cookie.ddtauth }),
          'Could not fetch session',
        );
        if (!data) return;

        if (
          data.session &&
          (data.session.expiresAt === null || data.session.expiresAt > new Date().toISOString())
        ) {
          setSession(data.session);
          if (router.pathname === '/login' && data.session.team !== null) router.push('/');
          if (router.pathname !== '/login' && data.session.team === null) router.push('/login');
        } else {
          removeCookie('ddtauth');
          if (router.pathname !== '/login') router.push('/login');
        }
      };

      getSession();
    }
  }, [cookie.ddtauth]);

  return session;
}
