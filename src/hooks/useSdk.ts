import { GraphQLClient } from 'graphql-request';
import { useCookies } from 'react-cookie';
import { getSdkWithHooks } from '@graphql/__generated__/codegen-self';
import { environment } from '@lib/environment';

export default function useSdk(): ReturnType<typeof getSdkWithHooks> {
  const [cookies] = useCookies(['ddtauth']);

  const client = new GraphQLClient(environment.endpoints.self, {
    headers: {
      authorization: `Bearer ${cookies.ddtauth}`,
    },
  });

  return getSdkWithHooks(client);
}
