import React, { ReactElement } from 'react';
import useTable from '@hooks/useTable';
import { c } from '@hooks/useTable/util';

export default function ComponentName(): ReactElement {
  const { headers, rows } = useTable(
    {
      name: c<string>({ label: 'Name' }),
      age: c<number>({ label: 'Age' }),
      hidden: c<number>({ label: 'Hidden' }),
      checked: c<boolean>({ label: 'Checked' }),
      house: c<{ streetName: string; houseNumber: number }>({
        label: 'House',
        render: (value) => `${value.streetName} ${value.houseNumber}`,
      }),
    },
    [
      {
        age: 27,
        checked: true,
        hidden: 48,
        name: 'Jenna Hunterson',
        house: { houseNumber: 298, streetName: 'Broadway' },
      },
      {
        checked: false,
        hidden: 98,
        house: { houseNumber: 34, streetName: 'Abbey Road' },
        age: 79,
        name: 'Paul McCartney',
      },
      {
        house: { streetName: 'Boulevard of broken dreams', houseNumber: 28 },
        name: 'Billie Joe Armstrong',
        checked: true,
        hidden: 2,
        age: 49,
      },
    ],
  );

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i}>{header.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.cells.map((cell, j) => (
              <td key={j}>{cell.render()}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
