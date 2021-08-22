import { getSessionQuery } from '@graphql/__generated__/codegen-self';
import { createContext } from 'react';

export const SessionContext = createContext<getSessionQuery['session']>(null);
