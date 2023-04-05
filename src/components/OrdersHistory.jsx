import * as React from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import OrderHistoryViewer from './OrderHistoryViewer';
import { UserId } from '../context/userId';
import axios from 'axios';


function createData(id, date, items, price, state) {
  return { id, date, items, price, state };
}

const api = axios.create({
  baseURL: "https://ayshadashboard.com/api",
})


export default function OrdersHistory () {

  const { userId, setUserId } = React.useContext(UserId);

  const [history, setHistory] = React.useState([]);

  const HisFormData = new FormData();
  React.useEffect(() => {
    // HisFormData.append("nbr_orders", 1 );
    api({
      method: "post",
      url: "orders-"+userId,
      data: HisFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      setHistory(res.data);
      console.log(res.data);
      console.log(userId)
    });
  }, [userId]);


  const totalPrice = (i)=>{
    let count = 0;
      for (let j = 0; j < history[i].products.length; j++) {
        count += (history[i].products[j].product.price * 1) * (history[i].products[j].quantity * 1 )
      }
      if(history[i].delivery_method=="normal"){
        count+=20
      }else{
        count+=5
      }
    return count
  }


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
          {history.map((row,key) => (
            <OrderHistoryViewer 
            key={key}
            id={row.id_command}
            date={row.created_at} 
            items={row.products?.length}
            price={totalPrice(key)}
            state={row.status}
            products={row.products}
            userId={userId}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </> 
  );
}