import React, { ReactElement } from 'react';
import useTable from '@hooks/useTable';

export default function TestTablePage(): ReactElement {
  const { headers, rows } = useTable<{
    name: string;
    age: number;
    hidden: boolean;
    boxChecked: boolean;
    musical: string | null;
    house: { streetName: string; houseNumber: number };
  }>(
    {
      name: {},
      age: {},
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
    ],
  );

  return (
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
  );
}
