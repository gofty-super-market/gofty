import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(id, date, items, price, state) {
  return { id, date, items, price, state };
}

const rows = [
  createData('#1502', "2023/12/2" , 15 , 240 , "delivered"),
  createData('#1502', "2023/11/1" , 25 , 540 , "delivered"),
  createData('#1502', "2023/11/1" , 25 , 540 , "delivered"),
  createData('#1502', "2023/11/1" , 25 , 540 , "delivered"),
];

export default function OrdersHistory () {
  return (
    <TableContainer  className="drop-shadow-lg bg-white rounded-lg">
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead className=''>
          <TableRow className=''>
            <TableCell>OrderId</TableCell>
            <TableCell >Date</TableCell>
            <TableCell >Items</TableCell>
            <TableCell >Price</TableCell>
            <TableCell >State</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
                className='hover:bg-gray-100 cursor-pointer '
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >
                {row.id}
              </TableCell>
              <TableCell >{row.date}</TableCell>
              <TableCell >{row.items}</TableCell>
              <TableCell >{row.price} MAD</TableCell>
              <TableCell ><span className='px-2 py-1 bg-green-500 text-white rounded-full'>{row.state}</span></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}