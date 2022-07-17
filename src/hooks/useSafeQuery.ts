import { ClientError, GraphQLClient } from 'graphql-request';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getSdkWithHooks, SdkWithHooks } from '@graphql/__generated__/codegen-self';
import { environment } from '@lib/environment';
import useDisplayError from './useDisplayError';
import useSession from './useSession';

export default function useSafeQuery<T extends keyof SdkWithHooks>(
  useQuery: T,
  variables: Parameters<SdkWithHooks[T]>[1],
  keyId?: string | null,
): ReturnType<SdkWithHooks[T]> {
  useEffect(() => {
    if (!useQuery.startsWith('use'))
      console.error(
        `The 'useSafeQuery' hook is only meant to be used with sdk hooks, '${useQuery}' is not allowed.`,
      );
  }, [useQuery]);

  const [cookies] = useCookies(['ddtauth']);

  const client = new GraphQLClient(environment.endpoints.self, {
    headers: { authorization: `Bearer ${cookies.ddtauth}` },
  });

  const sdk = getSdkWithHooks(client);

  const { session } = useSession();

  const key: string | null = !session ? null : useQuery + (keyId ?? '');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response: ReturnType<SdkWithHooks[T]> = (sdk[useQuery] as any)(key, variables);

  const { data, error } = response as { data: T | undefined; error: ClientError | undefined };

  useDisplayError(data, error);

  return response;
}
