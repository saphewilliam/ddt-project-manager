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

export type StonelistsTableData = { name: string; rows: getStoneListsQuery['stones'] }[];

export function makeStonelistTableData(data: getStoneListQuery | undefined): StonelistTableData {
  const result: StonelistTableData = [];
  if (data === undefined) return result;

  let stoneTypeId = '';
  for (let i = 0, j = -1; i < data.stoneList.length; i++) {
    if (stoneTypeId !== data.stoneList[i]!.stone.stoneTypeId) {
      stoneTypeId = data.stoneList[i]!.stone.stoneTypeId;
      result.push({ name: stoneTypeId, rows: [] });
      j++;
    }
    result[j]!.rows.push(data.stoneList[i]!);
  }
  return result.map((table) => ({
    ...table,
    name: data.stoneTypes.find((stoneType) => stoneType.id === table.name)!.name,
  }));
}

export type StonelistTableData = { name: string; rows: getStoneListQuery['stoneList'] }[];

export function makeStonelistsTableData(data: getStoneListsQuery | undefined): StonelistsTableData {
  const result: StonelistsTableData = [];
  if (data === undefined) return result;

  let stoneTypeId = '';
  for (let i = 0, j = -1; i < data.stones.length; i++) {
    if (stoneTypeId !== data.stones[i]!.stoneTypeId) {
      stoneTypeId = data.stones[i]!.stoneTypeId;
      result.push({ name: stoneTypeId, rows: [] });
      j++;
    }
    if (data.stones[i]!.stoneLists.length > 0) result[j]!.rows.push(data.stones[i]!);
  }

  return (
    result
      // Insert 0 values
      .map((table) => ({
        name: data.stoneTypes.find((stoneType) => stoneType.id === table.name)!.name,
        rows: table.rows.map((row) => ({
          ...row,
          stoneLists: data.stoneListUsers.map(
            (user) =>
              row.stoneLists.find((stoneList) => stoneList.userId === user.id) ?? {
                id: user.id,
                amount: 0,
                userId: user.id,
              },
          ),
        })),
      }))
      // Hide unused tables
      .filter((table) => table.rows.length > 0)
    // TODO hide unused columns
  );
}
