import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className='mt-20 h-[80vh] md:h-[50vh] w-ful flex flex-col gap-2 justify-center items-center'>
        <h1 className='text-[100px] md:text-[150px] text-gray-700'>404</h1>
        <h1 className='text-3xl text-gray-700'>Page Not Found</h1>
        <Link to={'/'} >
        <h1 className='text-xl button bg-prime text-white'><ArrowBackIcon/> Go Back Home</h1>
        </Link>
    </div>
  )
}
