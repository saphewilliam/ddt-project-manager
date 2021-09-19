import cx from 'clsx';
import React, { ReactElement } from 'react';
import useTable, { RenderCellProps, RenderHeadProps } from '@hooks/useTable';

export default function TestTablePage(): ReactElement {
  function TH(props: RenderHeadProps): ReactElement {
    return <th onClick={() => props.toggleHide && props.toggleHide()}>{props.label}</th>;
  }

  function TD(props: RenderCellProps): ReactElement {
    return <td style={{ background: '#f7d40a' }}>{String(props.value)}</td>;
  }

  const { headers, originalHeaders, rows, hiddenCols } = useTable<{
    name: string;
    age: number;
    hidden: boolean;
    boxChecked: boolean;
    musical: string | null;
    house: { streetName: string; houseNumber: number };
  }>(
    {
      name: {},
      age: { unhideable: true },
      hidden: { hidden: true },
      boxChecked: {},
      musical: { defaultValue: 'None' },
      house: {
        label: 'Address',
        renderCell: ({ value, row }) => (
          <td>{`${value.streetName} ${value.houseNumber} ${row.hidden}`}</td>
        ),
      },
    },
    [
      {
        age: 27,
        boxChecked: true,
        hidden: false,
        name: 'Jenna Hunterson',
        house: { houseNumber: 298, streetName: 'Broadway' },
        musical: 'Waitress',
      },
      {
        boxChecked: false,
        hidden: true,
        house: { houseNumber: 34, streetName: 'Abbey Road' },
        age: 79,
        name: 'Paul McCartney',
      },
      {
        house: { streetName: 'Boulevard of broken dreams', houseNumber: 28 },
        name: 'Billie Joe Armstrong',
        boxChecked: true,
        hidden: false,
        age: 49,
      },
      {
        age: 60,
        boxChecked: false,
        hidden: true,
        house: { streetName: 'Baker St.', houseNumber: 22 },
        name: 'Sherlock Holmes',
      },
      {
        house: { streetName: 'Pennsylvania Avenue', houseNumber: 1600 },
        name: 'Joe Biden',
        boxChecked: true,
        hidden: false,
        age: 78,
      },
      {
        house: { streetName: 'Conch Street', houseNumber: 24 },
        age: 35,
        boxChecked: false,
        hidden: false,
        name: 'Spongebob Squarepants',
        musical: 'Spongebob the Musical',
      },
    ],
    {
      style: {
        renderHead: TH,
        renderCell: TD,
      },
    },
  );

  return (
    <section className={cx('space-y-5', 'p-6')}>
      <table>
        <thead>
          <tr>
            {headers.map((header, i) => (
              <header.render key={i} />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.cells.map((cell, j) => (
                <cell.render key={j} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={cx('flex', 'flex-col')}>
        {originalHeaders.map((header, i) => (
          <label htmlFor={i.toString()} key={i} className={cx('flex', 'items-center', 'space-x-2')}>
            <input
              className={cx('disabled:text-dark-highlight')}
              disabled={!header.toggleHide}
              type="checkbox"
              name={i.toString()}
              id={i.toString()}
              checked={!header.hidden}
              onChange={() => header.toggleHide && header.toggleHide()}
            />
            <span>{header.label}</span>
          </label>
        ))}
      </div>

      <div className={cx('space-x-3')}>
        <button
          className={cx('bg-primary', 'text-white', 'font-bold', 'py-2', 'px-5', 'rounded-md')}
          onClick={hiddenCols.showAll}
        >
          Show All
        </button>
        <button
          className={cx('bg-primary', 'text-white', 'font-bold', 'py-2', 'px-5', 'rounded-md')}
          onClick={hiddenCols.hideAll}
        >
          Hide All
        </button>
      </div>
    </section>
  );
}
