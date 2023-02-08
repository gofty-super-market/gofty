import React from 'react'
import Logo from "../imgs/logo.png"
import CircularProgress from '@mui/material/CircularProgress';
function Loading() {
  return (
    <div className='flex items-center justify-center h-[100vh] w-full flex-col gap-8'>
        <img src={Logo} alt="" className='w-20'/>
        <CircularProgress color="inherit"/>
    </div>
  )
}

export default Loading