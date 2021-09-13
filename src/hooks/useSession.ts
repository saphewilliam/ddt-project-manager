import { useContext } from 'react';
import { SessionContext } from '@components/Providers/SessionProvider';
import { getSessionQuery } from '@graphql/__generated__/codegen-self';

export default function useSession(): getSessionQuery['session'] {
  return useContext(SessionContext);
}
