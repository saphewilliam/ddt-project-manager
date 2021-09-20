import cx from 'clsx';
import React, { ReactElement, useState } from 'react';
import useTable, { RenderCellProps, RenderHeadProps, SortOrder } from '@hooks/useTable';

export default function TestTablePage(): ReactElement {
  const [musicalInput, setMusicalInput] = useState<string | undefined>(undefined);

  function TH(props: RenderHeadProps): ReactElement {
    return (
      <th
        className={cx(props.toggleSort && 'cursor-pointer', 'select-none')}
        onClick={() => props.toggleSort && props.toggleSort()}
      >
        {props.label}{' '}
        {props.sortOrder === SortOrder.ASC ? 'v' : props.sortOrder === SortOrder.DESC ? '^' : ''}
      </th>
    );
  }

  function TD(props: RenderCellProps): ReactElement {
    return <td style={{ background: '#f7d40a' }}>{String(props.value)}</td>;
  }

  const { headers, originalHeaders, rows, hiddenCols, pagination } = useTable<{
    name: string;
    age: number;
    hidden: boolean;
    boxChecked: boolean;
    musical: string | null;
    house: { streetName: string; houseNumber: number };
    hiddenAnd: boolean | null;
  }>(
    {
      name: { unsortable: true },
      age: { unhideable: true },
      hidden: { hidden: true },
      boxChecked: {},
      musical: { defaultValue: 'None' },
      house: {
        label: 'Address',
        renderCell: ({ value, row }) => (
          <td>{`${value.streetName} ${value.houseNumber} ${row.hidden}`}</td>
        ),
        sort: (a, b, invert) => (invert ? -1 : 1) * (a.houseNumber - b.houseNumber),
      },
      hiddenAnd: {
        label: 'Hidden AND Gate',
        defaultValue: (row) => row.hidden && row.boxChecked,
      },
    },
    [
      {
        age: 27,
        boxChecked: true,
        hidden: true,
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
        musical: musicalInput,
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
      {
        name: 'Peter Griffin',
        boxChecked: false,
        hidden: false,
        house: { houseNumber: 31, streetName: 'Spooner Street' },
        age: 45,
      },
    ],
    {
      pageSize: 3,
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
        <label htmlFor="musical" className={cx('mb-2')}>
          Billie Joe Armstrong&apos;s Musical
        </label>
        <input
          type="text"
          name="musical"
          id="musical"
          value={musicalInput ?? ''}
          onChange={({ target: { value: v } }) => setMusicalInput(v === '' ? undefined : v)}
        />
      </div>

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

      <div className={cx('space-x-3')}>
        <button
          className={cx(
            'bg-secondary',
            'disabled:bg-dark-highlight',
            'disabled:cursor-not-allowed',
            'text-white',
            'font-bold',
            'py-2',
            'px-5',
            'rounded-md',
          )}
          disabled={!pagination.canPrev}
          onClick={pagination.prevPage}
        >
          Previous page
        </button>
        <span>
          Page {pagination.page} of {pagination.pageAmount}
        </span>
        <button
          className={cx(
            'bg-secondary',
            'disabled:bg-dark-highlight',
            'disabled:cursor-not-allowed',
            'text-white',
            'font-bold',
            'py-2',
            'px-5',
            'rounded-md',
          )}
          disabled={!pagination.canNext}
          onClick={pagination.nextPage}
        >
          Next page
        </button>
      </div>
    </section>
  );
}
