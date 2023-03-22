import * as React from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import OrderHistoryViewer from './OrderHistoryViewer';


function createData(id, date, items, price, state) {
  return { id, date, items, price, state };
}

const rows = [
  createData('#1501', "2023/12/2" , 15 , 240 , "delivered"),
  createData('#1502', "2023/11/1" , 25 , 540 , "delivered"),
  createData('#1503', "2023/11/1" , 25 , 540 , "delivered"),
  createData('#1505', "2023/11/1" , 25 , 540 , "delivered"),
];

export default function OrdersHistory () {

  return (
   <>
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
            <OrderHistoryViewer 
            key={row.id}
            id={row.id}
            date={row.date} 
            items={row.items}
            price={row.price}
            state={row.state}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </> 
  );
}