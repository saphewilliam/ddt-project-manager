import { Columns } from '@saphe/react-table';
import {
  InventoryQuery,
  UserInventoryQuery,
  Role,
  SessionQuery,
} from '@graphql/__generated__/codegen-self';
import { ColorCell, EditCell } from '@templates/InventoryTemplate/InventoryCells';

export interface InventoryTableData {
  stones: StoneInventoryTable[];
  attributes: AttributeInventoryTable[];
}

export interface StoneInventoryTable {
  title: string;
  rows: {
    id: string;
    name: string;
    alias: string;
    alias2?: string | null;
    hex: string;
    hex2?: string | null;
    order: number;
    stoneTypeId: string;
    stoneInventory: {
      id: string;
      amount: number;
      userId: string;
      displayName: string;
    }[];
  }[];
}

export interface AttributeInventoryTable {
  title: string;
  rows: {
    id: string;
    name: string;
    attributeInventory: {
      id: string;
      amount: number;
      userId: string;
      displayName: string;
    }[];
  }[];
}

export type InventoryUsers = {
  userId: string;
  displayname: string;
}[];

interface InventoryColumnTypes {
  total: number;
  edit: () => void;
}

interface ColorColumTypes {
  color: {
    id: string;
    name: string;
    alias: string;
    alias2?: string | null;
    hex: string;
    hex2?: string | null;
    order: number;
  };
}

interface AttributeColumTypes {
  attribute: {
    id: string;
    name: string;
  };
}

interface OnProjectColumnTypes {
  person: string;
  amount: number;
}

export type StoneInventoryColumnTypes = InventoryColumnTypes & ColorColumTypes;
export type StonesOnProjectColumnTypes = OnProjectColumnTypes & ColorColumTypes;
export type AttributeInventoryColumnTypes = InventoryColumnTypes & AttributeColumTypes;
export type AttributesOnProjectColumnTypes = OnProjectColumnTypes & AttributeColumTypes;

function makeInventoryTableColumns(
  inventoryUsers: InventoryUsers,
  session: SessionQuery['session'],
): Columns<InventoryColumnTypes> {
  return {
    ...inventoryUsers.reduce(
      (prev, curr) => ({ ...prev, [curr.userId]: { label: curr.displayname, defaultValue: 0 } }),
      {},
    ),
    total: {
      hidden: inventoryUsers.length <= 1,
      unhideable: true,
    },
    edit: {
      renderCell: EditCell,
      label: '',
      hidden: !(session?.user.isAdmin || session?.member?.role === Role.CAPTAIN),
      unhideable: true,
      unsortable: true,
    },
  };
}

export const makeStoneInventoryTableColumns = (
  inventoryUsers: InventoryUsers,
  session: SessionQuery['session'],
): Columns<StoneInventoryColumnTypes> => ({
  color: { renderCell: ColorCell, unhideable: true, sort: (a, b) => b.order - a.order },
  ...makeInventoryTableColumns(inventoryUsers, session),
});

export const makeAttributeInventoryTableColumns = (
  inventoryUsers: InventoryUsers,
  session: SessionQuery['session'],
): Columns<AttributeInventoryColumnTypes> => ({
  attribute: {
    unhideable: true,
    sort: (a, b) => b.name.localeCompare(a.name),
    stringify: (value) => value.name,
  },
  ...makeInventoryTableColumns(inventoryUsers, session),
});

export function makeInventoryTableData(
  data: UserInventoryQuery | undefined | null,
): InventoryTableData {
  const result: InventoryTableData = { stones: [], attributes: [] };
  if (!data) return result;

  // Stones Inventory
  let stoneTypeId = '';
  for (let i = 0, j = -1; i < data.userStoneInventory.length; i++) {
    const { stone, id, amount } = data.userStoneInventory[i]!;
    if (stoneTypeId !== stone.stoneTypeId) {
      stoneTypeId = stone.stoneTypeId;
      result.stones.push({ title: stoneTypeId, rows: [] });
      j++;
    }

    result.stones[j]!.rows.push({
      ...stone,
      stoneInventory: [
        {
          amount,
          id,
          userId: data.user?.id ?? '',
          displayName: `${data.user?.firstName} ${data.user?.lastName}`,
        },
      ],
    });
  }

  // Attributes Inventory
  const attributes: AttributeInventoryTable[] =
    data.userAttributeInventory.length === 0
      ? []
      : [
          {
            title: 'Attributes',
            rows: data.userAttributeInventory.map(({ id, amount, attribute }) => ({
              id: attribute.id,
              name: attribute.namePlural,
              attributeInventory: [
                {
                  id,
                  amount,
                  userId: data.user?.id ?? '',
                  displayName: `${data.user?.firstName} ${data.user?.lastName}`,
                },
              ],
            })),
          },
        ];

  return {
    stones: result.stones.map((table) => ({
      ...table,
      title: data.stoneTypes.find((stoneType) => stoneType.id === table.title)!.name,
    })),
    attributes,
  };
}

export function makeAllInventoryTableData(data: InventoryQuery | undefined): InventoryTableData {
  const result: InventoryTableData = { stones: [], attributes: [] };
  if (data === undefined) return result;

  // Stones Inventory
  let stoneTypeId = '';
  for (let i = 0, j = -1; i < data.stones.length; i++) {
    const stone = data.stones[i]!;
    if (stoneTypeId !== stone.stoneTypeId) {
      stoneTypeId = stone.stoneTypeId;
      result.stones.push({ title: stoneTypeId, rows: [] });
      j++;
    }
    if (data.stones[i]!.inventory.length > 0)
      result.stones[j]!.rows.push({
        ...stone,
        stoneInventory: stone.inventory.map((inventory) => ({
          ...inventory,
          displayName:
            data.inventoryUsers.find((user) => user.id === inventory.userId)?.displayName ??
            'No name',
        })),
      });
  }

  // Attributes Inventory
  const attributes: AttributeInventoryTable[] = [
    {
      title: 'Attributes',
      rows: data.attributes
        .map((attribute) => ({
          id: attribute.id,
          name: attribute.namePlural,
          attributeInventory: attribute.inventory.map((inventory) => ({
            ...inventory,
            displayName:
              data.inventoryUsers.find((user) => user.id === inventory.userId)?.displayName ??
              'No name',
          })),
        }))
        .filter((row) => row.attributeInventory.length > 0),
    },
  ].filter((table) => table.rows.length > 0);

  return {
    stones: result.stones
      .map((table) => ({
        ...table,
        title: data.stoneTypes.find((stoneType) => stoneType.id === table.title)!.name,
      }))
      .filter((table) => table.rows.length > 0),
    attributes,
  };
}

export function getInventoryUserColumns(
  rows: StoneInventoryTable['rows'] | AttributeInventoryTable['rows'],
): InventoryUsers {
  const userIds: Record<string, boolean> = {};
  const result: InventoryUsers = [];

  const addUser = (inventory: { userId: string; displayName: string }) => {
    if (!userIds[inventory.userId]) {
      userIds[inventory.userId] = true;
      result.push({ userId: inventory.userId, displayname: inventory.displayName });
    }
  };

  rows.forEach((row) => {
    if ('stoneInventory' in row) row.stoneInventory.forEach(addUser);
    else row.attributeInventory.forEach(addUser);
  });

  return result;
}
