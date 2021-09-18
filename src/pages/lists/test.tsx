import React, { ReactElement } from 'react';
import useTable, { c } from '@hooks/useTable';

export default function TestTablePage(): ReactElement {
  const { headers, rows } = useTable(
    {
      name: c<string>(),
      age: c<number>(),
      hidden: c<number>(),
      boxChecked: c<boolean>(),
      house: c<{ streetName: string; houseNumber: number }>({
        label: 'Address',
        renderCell: ({ value, row }) => (
          <td>{`${value.streetName} ${value.houseNumber} ${row}`}</td>
        ),
      }),
    },
    [
      {
        age: 27,
        boxChecked: true,
        hidden: 48,
        name: 'Jenna Hunterson',
        house: { houseNumber: 298, streetName: 'Broadway' },
      },
      {
        boxChecked: false,
        hidden: 98,
        house: { houseNumber: 34, streetName: 'Abbey Road' },
        age: 79,
        name: 'Paul McCartney',
      },
      {
        house: { streetName: 'Boulevard of broken dreams', houseNumber: 28 },
        name: 'Billie Joe Armstrong',
        boxChecked: true,
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

// interface Hello {
//   id: number;
//   name?: string;
//   recursive?: Hello;
// }

// const hello: Hello = {};
