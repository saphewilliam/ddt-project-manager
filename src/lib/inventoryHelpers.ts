import { Columns } from '@saphe/react-table';
import { ColorCell, EditCell } from '@components/StoneList/StoneListCells';
import {
  StoneListsQuery,
  UserStoneListQuery,
  Role,
  SessionQuery,
} from '@graphql/__generated__/codegen-self';

export type StoneListTableData = StoneListTableType[];

export interface StoneListTableType {
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

export type StoneListColumnTypes = {
  color: {
    id: string;
    name: string;
    alias: string;
    alias2?: string | null;
    hex: string;
    hex2?: string | null;
    order: number;
  };
  total: number;
  edit: () => void;
};

export type ProjectStoneListColumnTypes = {
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
};

export function makeStoneListTableColumns(
  userColumns: StoneListUserColumns,
  session: SessionQuery['session'],
): Columns<StoneListColumnTypes> {
  return {
    color: {
      renderCell: ColorCell,
      unhideable: true,
      sort: (a, b) => b.order - a.order,
    },
    ...userColumns.reduce(
      (prev, curr) => ({ ...prev, [curr.userId]: { label: curr.displayname, defaultValue: 0 } }),
      {},
    ),
    total: {
      hidden: userColumns.length <= 1,
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

export function makeStoneListTableData(
  data: UserStoneListQuery | undefined | null,
): StoneListTableData {
  const result: StoneListTableData = [];
  if (data === undefined || data === null) return result;

  let stoneTypeId = '';
  for (let i = 0, j = -1; i < data.userStoneList.length; i++) {
    const { stone, id, amount } = data.userStoneList[i]!;
    if (stoneTypeId !== stone.stoneTypeId) {
      stoneTypeId = stone.stoneTypeId;
      result.push({ title: stoneTypeId, rows: [] });
      j++;
    }

    result[j]!.rows.push({
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

  return result.map((table) => ({
    ...table,
    title: data.stoneTypes.find((stoneType) => stoneType.id === table.title)!.name,
  }));
}

export function makeStoneListsTableData(data: StoneListsQuery | undefined): StoneListTableData {
  const result: StoneListTableData = [];
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

export type StoneListUserColumns = {
  userId: string;
  displayname: string;
}[];

export function getStoneListUserColumns(rows: StoneListTableType['rows']): StoneListUserColumns {
  const userIds: Record<string, boolean> = {};
  const result: StoneListUserColumns = [];

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
