import { makeOperation } from '@urql/core';
import { authExchange } from '@urql/exchange-auth';
import { refocusExchange } from '@urql/exchange-refocus';
import { retryExchange } from '@urql/exchange-retry';
import Cookies from 'universal-cookie';
import { cacheExchange, createClient, dedupExchange, fetchExchange } from 'urql';
import { environment } from '@lib/environment';

export const client = createClient({
  url: environment.endpoints.self,
  exchanges: [
    dedupExchange,
    refocusExchange(),
    cacheExchange,
    retryExchange({
      retryIf: (error) => !!(error.graphQLErrors.length > 0 || error.networkError),
    }),
    authExchange<{
      access: string;
      accessExpiresAt: string | null; // ISO date string
    }>({
      async getAuth({ authState }) {
        if (!authState) {
          const cookies = new Cookies();
          const token = cookies.get('auth', { doNotParse: true });
          console.log(token);
        }
        return null;
      },
      addAuthToOperation({ authState, operation }) {
        if (!authState) return operation;

        const fetchOptions =
          typeof operation.context.fetchOptions === 'function'
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};

        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `Bearer ${authState.access}`,
            },
          },
        });
      },
      didAuthError: ({ error }) => error.message.startsWith('[AUTH] Access denied! '),
      willAuthError: ({ authState }) =>
        !authState ||
        (authState.accessExpiresAt !== null && new Date(authState.accessExpiresAt) < new Date()),
    }),
    fetchExchange,
  ],
});
