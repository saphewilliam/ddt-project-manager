import { Dispatch, SetStateAction, useContext } from 'react';
import { getSessionQuery } from '@graphql/__generated__/codegen-self';
import { SessionContext } from '@providers/SessionProvider';

export default function useSession(): {
  session: getSessionQuery['session'];
  setSession: Dispatch<SetStateAction<getSessionQuery['session']>>;
} {
  return useContext(SessionContext);
}
