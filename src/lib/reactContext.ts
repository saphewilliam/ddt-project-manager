import { createContext } from 'react';
import { getSessionQuery } from '@graphql/__generated__/codegen-self';

export const SessionContext = createContext<getSessionQuery['session']>(null);
