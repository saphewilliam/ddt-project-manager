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

export interface StoneInventoryColumnTypes extends InventoryColumnTypes {
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

export interface AttributeInventoryColumnTypes extends InventoryColumnTypes {
  attribute: {
    id: string;
    namePlural: string;
  };
}

export interface StonesOnProjectColumnTypes {
  color: {
    id: string;
    name: string;
    alias: string;
    alias2?: string | null;
    hex: string;
    hex2?: string | null;
    order: number;
  };
  person: string;
  amount: number;
}

export function makeAttributeInventoryTableColumns(
  inventoryUsers: InventoryUsers,
  session: SessionQuery['session'],
): Columns<AttributeInventoryColumnTypes> {
  return {
    attribute: {
      unhideable: true,
      sort: (a, b) => a.namePlural.localeCompare(b.namePlural),
    },
    ...makeInventoryTableColumns(inventoryUsers, session),
  };
}

export function makeStoneInventoryTableColumns(
  inventoryUsers: InventoryUsers,
  session: SessionQuery['session'],
): Columns<StoneInventoryColumnTypes> {
  return {
    color: {
      renderCell: ColorCell,
      unhideable: true,
      sort: (a, b) => b.order - a.order,
    },
    ...makeInventoryTableColumns(inventoryUsers, session),
  };
}

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
  const attributes: AttributeInventoryTable[] = [
    {
      title: 'Attributes',
      rows: ,
    },
  ];
  // title: string;
  // rows: {
  //   id: string;
  //   name: string;
  //   attributeLists: {
  //     id: string;
  //     amount: number;
  //     userId: string;
  //     displayName: string;
  //   }[];
  // }[];

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

  let stoneTypeId = '';
  data.stoneListUsers[0]?.displayName;
  for (let i = 0, j = -1; i < data.stones.length; i++) {
    const stone = data.stones[i]!;
    if (stoneTypeId !== stone.stoneTypeId) {
      stoneTypeId = stone.stoneTypeId;
      result.push({ title: stoneTypeId, rows: [] });
      j++;
    }
    if (data.stones[i]!.stoneLists.length > 0)
      result[j]!.rows.push({
        ...stone,
        stoneLists: stone.stoneLists.map((stoneList) => ({
          ...stoneList,
          displayName:
            data.stoneListUsers.find((user) => user.id === stoneList.userId)?.displayName ??
            'No name',
        })),
      });
  }

  return result
    .map((table) => ({
      ...table,
      title: data.stoneTypes.find((stoneType) => stoneType.id === table.title)!.name,
    }))
    .filter((table) => table.rows.length > 0);
}

export function getInventoryUserColumns(rows: StoneInventoryTable['rows']): InventoryUsers {
  const userIds: Record<string, boolean> = {};
  const result: InventoryUsers = [];

  rows.forEach((row) =>
    row.stoneLists.forEach((stoneList) => {
      if (!userIds[stoneList.userId]) {
        userIds[stoneList.userId] = true;
        result.push({ userId: stoneList.userId, displayname: stoneList.displayName });
      }
    }),
  );
  return result;
}
