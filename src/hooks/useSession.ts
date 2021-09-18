import { Dispatch, SetStateAction, useContext } from 'react';
import { SessionContext } from '@components/Providers/SessionProvider';
import { getSessionQuery } from '@graphql/__generated__/codegen-self';

export default function useSession(): {
  session: getSessionQuery['session'];
  setSession: Dispatch<SetStateAction<getSessionQuery['session']>>;
} {
  return useContext(SessionContext);
}
