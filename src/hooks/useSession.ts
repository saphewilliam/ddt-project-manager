import { useContext } from 'react';
import { getSessionQuery } from '@graphql/__generated__/codegen-self';
import { SessionContext } from '@lib/reactContext';

export default function useSession(): getSessionQuery['session'] {
  return useContext(SessionContext);
}
