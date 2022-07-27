import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import Tabs from '@components/Tabs';
import { ProjectQuery } from '@graphql/__generated__/codegen';
import ProjectStoneTable, {
  Props as ProjectStoneTableProps,
} from '../InventoryTemplate/ProjectStoneTable';

export interface Props {
  project: NonNullable<ProjectQuery['project']>;
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
}

export default function GeneralPanel(props: Props): ReactElement {
  return props.project.parts.length === 0 ? (
    <p>Please add a part</p>
  ) : props.project.parts.length === 1 ? (
    <ProjectStoneTable rows={props.project.parts[0]!.stones} />
  ) : (
    <Tabs
      vertical
      tabIndex={props.tabIndex}
      setTabIndex={props.setTabIndex}
      tabData={[
        {
          label: 'Overview',
          content: (
            <ProjectStoneTable
              rows={props.project.parts.reduce((prev, curr) => {
                const newRows = [...prev] as ProjectStoneTableProps['rows'];
                for (const s of curr.stones) {
                  const index = newRows.findIndex(
                    (row) => row.stone.id === s.stone.id && row.user.id === s.user.id,
                  );
                  if (index === -1) newRows.push(s);
                  else {
                    const i = newRows[index];
                    if (i) newRows[index] = { ...i, amount: s.amount + i.amount };
                  }
                }
                return newRows;
              }, [] as ProjectStoneTableProps['rows'])}
            />
          ),
        },
        ...(props.project.parts.map((part) => ({
          label: `#${props.project?.number}.${part.number} ${part.name}`,
          content: <ProjectStoneTable rows={part.stones} />,
        })) ?? []),
      ]}
    />
  );
}
