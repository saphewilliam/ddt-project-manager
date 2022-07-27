import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export interface Props {
  children?: ReactNode;
}

export type State = {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  expandedItem: number | null;
  setExpandedItem: Dispatch<SetStateAction<number | null>>;
};

export const NavigationContext = createContext<State>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCollapsed: () => {},
  collapsed: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setExpandedItem: () => {},
  expandedItem: null,
});

export function NavigationProvider(props: Props): ReactElement {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  return (
    <NavigationContext.Provider
      value={{
        collapsed,
        setCollapsed,
        expandedItem,
        setExpandedItem,
      }}
    >
      {props.children}
    </NavigationContext.Provider>
  );
}

export default function useNavigation(): State {
  return useContext(NavigationContext);
}
