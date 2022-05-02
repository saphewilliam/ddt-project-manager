import useAsyncReducer from './useAsyncReducer';
import useSdk from './useSdk';

export interface State {
  isOpen: boolean;
  isLoading: boolean;
  stoneId: string | null;
  stoneAmount: number | null;
  attributeId: string | null;
  attributeAmount: number | null;
  userId: string | null;
  tabIndex: number;
}

export type Action =
  | { type: 'close' }
  | { type: 'loading' }
  | { type: 'setTabIndex'; payload: { tabIndex: number } }
  | { type: 'openStone'; payload: { stoneId?: string; userId?: string } }
  | { type: 'updateStoneAmount'; payload: { stoneId: string; userId: string } }
  | { type: 'openAttribute'; payload: { attributeId?: string; userId?: string } }
  | { type: 'updateAttributeAmount'; payload: { attributeId: string; userId: string } };

export type Dispatch = (action: Action) => Promise<void>;

const initialState: State = {
  isOpen: false,
  isLoading: false,
  stoneId: null,
  stoneAmount: null,
  attributeId: null,
  attributeAmount: null,
  userId: null,
  tabIndex: 0,
};

export default function useInventoryEditModal(): [State, Dispatch] {
  const sdk = useSdk();

  const [state, dispatch] = useAsyncReducer<State, Action>(async (prevState, action) => {
    switch (action.type) {
      case 'close':
        return { ...prevState, isOpen: false };
      case 'loading':
        return { ...prevState, isLoading: true };
      case 'setTabIndex':
        return { ...prevState, tabIndex: action.payload.tabIndex };
      case 'updateStoneAmount': {
        await dispatch({ type: 'loading' });
        const { stoneInventory } = await sdk.StoneInventory(action.payload);
        if (stoneInventory)
          return { ...prevState, isLoading: false, stoneAmount: stoneInventory.amount };
        else return { ...prevState, isLoading: false, stoneAmount: 0 };
      }
      case 'updateAttributeAmount': {
        await dispatch({ type: 'loading' });
        const { attributeInventory } = await sdk.AttributeInventory(action.payload);
        if (attributeInventory)
          return { ...prevState, isLoading: false, attributeAmount: attributeInventory.amount };
        else return { ...prevState, isLoading: false, attributeAmount: 0 };
      }
      case 'openStone':
        return {
          ...initialState,
          isOpen: true,
          isLoading: true,
          tabIndex: 0,
          stoneId: action.payload.stoneId ?? null,
          userId: action.payload.userId ?? null,
        };
      case 'openAttribute':
        return {
          ...initialState,
          isOpen: true,
          isLoading: true,
          tabIndex: 1,
          attributeId: action.payload.attributeId ?? null,
          userId: action.payload.userId ?? null,
        };
    }
  }, initialState);

  return [state, dispatch];
}
