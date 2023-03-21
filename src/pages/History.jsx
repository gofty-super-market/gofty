import { OrderedList } from '@chakra-ui/react'
import React from 'react'
import OrdersHistory from '../components/OrdersHistory'

function History() {
  return (
    <div className="mx-auto max-w-[1100px] w-full mt-16 md:mt-28 px-4 text-gray-700 items-center">
        <h1 className='text-3xl my-10'>History</h1>
        <OrdersHistory/>
    </div>
  )
}

export default History