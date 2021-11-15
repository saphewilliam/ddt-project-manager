import { useRouter } from 'next/router';
import React, { ReactElement, useCallback, useState } from 'react';
import { useCookies } from 'react-cookie';
import Button from '@components/Button';
import Layout from '@components/Layout';
import useSdk from '@hooks/useSdk';
import useSession from '@hooks/useSession';
import { promiseWithCatch } from '@lib/util';

export default function ListsPage(): ReactElement {
  const [loading, setLoading] = useState(false);
  const [, , removeCookie] = useCookies(['ddtauth']);
  const sdk = useSdk();
  const router = useRouter();
  const { setSession } = useSession();

  const handleLogout = useCallback(async () => {
    setLoading(true);
    removeCookie('ddtauth');
    setSession(null);

    const data = await promiseWithCatch(sdk.logout(), 'failed to log out');
    if (data === null) {
      setLoading(false);
      return;
    }

    router.push('/login');
  }, []);

  return (
    <Layout title="Profile">
      <Button label="Log Out" onClick={handleLogout} loading={loading} />
    </Layout>
  );
}
