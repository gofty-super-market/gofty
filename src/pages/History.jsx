import { OrderedList } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import OrdersHistory from '../components/OrdersHistory'
import { LogedinContext } from '../context/Logedin';
import { UserId } from '../context/userId';
import HistoryIcon from '@mui/icons-material/History';
function History() {

  const { userId, setUserId } = useContext(UserId);
  const { logedin, setLogedin } = useContext(LogedinContext);
  const navigate = useNavigate()
  useEffect(()=>{
    if(logedin==!true && !userId){
      navigate("/signin") 
    }
  },[userId])
  return (
    <div className="mx-auto max-w-[1100px] w-full mt-16 md:mt-28 px-4 text-gray-700 items-center">
        <h1 className="text-4xl py-4 flex-1 flex gap-4 items-center"> <HistoryIcon sx={{ fontSize: 50 }}/> Orders History </h1>
        <OrdersHistory/>
    </div>
  )
}

export default History