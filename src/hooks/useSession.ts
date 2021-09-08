import { createContext, useContext } from 'react';
import { getSessionQuery } from '@graphql/__generated__/codegen-self';

export const SessionContext = createContext<getSessionQuery['session']>(null);

export default function useSession(): getSessionQuery['session'] {
  return useContext(SessionContext);
}
