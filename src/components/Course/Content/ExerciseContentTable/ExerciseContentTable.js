import React, { useMemo } from "react";
import { useTable } from "react-table";

function ExerciseContentTable({ data }) {
  console.log("data bad wala", data);
  // const tableInstance = useTable({
  //     columns: data.value.header,
  //     Data: data.value.value
  // })

  const columns = data.value.header;
  const tableData = data.value.value;

  // console.log("tableInstance", tableInstance.columns)

  // const {
  //     getTaleProps,
  //     getTableBodyProps,
  //     headerGroups,
  //     rows,
  //     prepareRow,
  // } = tableInstance

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => {
            return <th>{col}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {tableData.map((rows) => {
          return (
            <tr>
              {rows.map((row) => {
                return <th>{row}</th>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  // return (
  //     <table {...getTableProps()}>
  //         <thead>
  //         {
  //         headerGroups.map(headerGroup => (
  //             <tr {...headerGroup.getHeaderGroupProps()}>
  //             {
  //             headerGroup.headers.map(column => (
  //                 <th {...column.getHeaderProps()}>
  //                 {
  //                 column.render('Header')}
  //                 </th>
  //             ))}
  //             </tr>
  //         ))}
  //         </thead>
  //         <tbody {...getTableBodyProps()}>
  //         {
  //         rows.map(row => {
  //             prepareRow(row)
  //             return (
  //             <tr {...row.getRowProps()}>
  //                 {
  //                 row.cells.map(cell => {
  //                 return (
  //                     <td {...cell.getCellProps()}>
  //                     {
  //                     cell.render('Cell')}
  //                     </td>
  //                 )
  //                 })}
  //             </tr>
  //             )
  //         })}
  //         </tbody>
  //     </table>
  // )
}

export default ExerciseContentTable;
