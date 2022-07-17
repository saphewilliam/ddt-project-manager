import { GraphQLClient } from 'graphql-request';
import { useCookies } from 'react-cookie';
import { getSdk, Sdk } from '@graphql/__generated__/codegen';
import { environment } from '@lib/environment';

export default function useSdk(): Sdk {
  const [cookies] = useCookies(['ddtauth']);

  const client = new GraphQLClient(environment.endpoints.self, {
    headers: { authorization: `Bearer ${cookies.ddtauth}` },
  });

  return getSdk(client);
}
