import { Columns } from '@saphe/react-table';
import { ColorCell, EditCell } from '@components/templates/InventoryTemplate/StoneListCells';
import {
  InventoryQuery,
  UserInventoryQuery,
  Role,
  SessionQuery,
} from '@graphql/__generated__/codegen-self';

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
    stoneLists: {
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
    attributeLists: {
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
  for (let i = 0, j = -1; i < data.userStoneList.length; i++) {
    const { stone, id, amount } = data.userStoneList[i]!;
    if (stoneTypeId !== stone.stoneTypeId) {
      stoneTypeId = stone.stoneTypeId;
      result.stones.push({ title: stoneTypeId, rows: [] });
      j++;
    }

    result.stones[j]!.rows.push({
      ...stone,
      stoneLists: [
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
    data.userAttributeList.length === 0
      ? []
      : [
          {
            title: 'Attributes',
            rows: data.userAttributeList.map(({ id, amount, attribute }) => ({
              id: attribute.id,
              name: attribute.namePlural,
              attributeLists: [
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
    if (data.stones[i]!.stoneLists.length > 0)
      result.stones[j]!.rows.push({
        ...stone,
        stoneLists: stone.stoneLists.map((stoneList) => ({
          ...stoneList,
          displayName:
            data.stoneListUsers.find((user) => user.id === stoneList.userId)?.displayName ??
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
          attributeLists: attribute.attributeLists.map((attributeList) => ({
            id: attributeList.id,
            amount: attributeList.amount,
            userId: attributeList.userId,
            displayName:
              data.stoneListUsers.find((user) => user.id === attributeList.userId)?.displayName ??
              'No name',
          })),
        }))
        .filter((row) => row.attributeLists.length > 0),
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

  const addUser = (list: { userId: string; displayName: string }) => {
    if (!userIds[list.userId]) {
      userIds[list.userId] = true;
      result.push({ userId: list.userId, displayname: list.displayName });
    }
  };

  rows.forEach((row) => {
    if ('stoneLists' in row) row.stoneLists.forEach(addUser);
    else row.attributeLists.forEach(addUser);
  });

  return result;
}
