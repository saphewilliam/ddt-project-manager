import { Dispatch, SetStateAction, useContext } from 'react';
import { SessionQuery } from '@graphql/__generated__/codegen-self';
import { SessionContext } from '@providers/SessionProvider';

export default function useSession(): {
  session: SessionQuery['session'];
  setSession: Dispatch<SetStateAction<SessionQuery['session']>>;
} {
  return useContext(SessionContext);
}
