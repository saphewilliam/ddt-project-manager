import { getStoneListsQuery, getStoneListQuery } from '@graphql/__generated__/codegen-self';

export function fontColorFromBackground(hex: string): string {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  if (luminance > 0.5) return '#000';
  else return '#fff';
}

export function formatNumber(number: number): string {
  return String(number).replace(/(.)(?=(\d{3})+$)/g, '$1.');
}

export type StoneListTableData = StoneListTable[];

export interface StoneListTable {
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
  edit: string;
};

export function makeStoneListTableData(
  data: getStoneListQuery | undefined | null,
): StoneListTableData {
  const result: StoneListTableData = [];
  if (data === undefined || data === null) return result;

  let stoneTypeId = '';
  for (let i = 0, j = -1; i < data.stoneList.length; i++) {
    const { stone, id, amount } = data.stoneList[i]!;
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

export function makeStoneListsTableData(data: getStoneListsQuery | undefined): StoneListTableData {
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

export function getStoneListUserColumns(rows: StoneListTable['rows']): StoneListUserColumns {
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
