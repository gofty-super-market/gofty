import React from 'react'
import logo from "../imgs/logo.png"
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import { Link } from 'react-router-dom';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
export default function SignInPage() {
  return (
    <div className='text-gray-700 my-16 mb-0 md:mb-28 md:my-28 flex flex-col items-center justify-center'>
      <h1 className='text-3xl font-medium'>Sing Up</h1>
      <form className='gap-5 p-6 py-8 md:py-12 flex flex-col items-center w-full max-w-lg rounded-3xl  ' action="">
        <div className='flex flex-col md:flex-row w-full gap-4'>
          <div className='w-full border rounded-xl h-10 overflow-hidden drop-shadow-md gap-2 bg-white flex pl-2 items-center '>
            <PersonIcon />
            <input type="text" placeholder='First name' className='flex-1 h-full outline-none' />
          </div>
          <div className='w-full border rounded-xl h-10 overflow-hidden drop-shadow-md gap-2 bg-white flex pl-2 items-center '>
            <PersonIcon />
            <input type="text" placeholder='Last name' className='flex-1 h-full outline-none' />
          </div>
        </div>
        <div className='w-full border rounded-xl h-10 overflow-hidden drop-shadow-md gap-2 bg-white flex pl-2 items-center '>
          <EmailIcon />
          <input type="text" placeholder='Your Email' className='flex-1 h-full outline-none' />
        </div>
        <div className='flex flex-col md:flex-row w-full gap-4'>
          <div className='w-full border rounded-xl h-10 overflow-hidden drop-shadow-md gap-2 bg-white flex pl-2 items-center '>
            <HttpsIcon />
            <input type="password" placeholder='Enter password' className='flex-1 h-full outline-none' />
          </div>

          <div className='w-full border rounded-xl h-10 overflow-hidden drop-shadow-md gap-2 bg-white flex pl-2 items-center '>
            <HttpsIcon />
            <input type="password" placeholder='conferm Password' className='flex-1 h-full outline-none' />
          </div>
        </div>
        <div className='w-full border rounded-xl h-10 overflow-hidden drop-shadow-md gap-2 bg-white flex pl-2 items-center '>
          <LocalPhoneIcon />
          <input type="number" placeholder='your number' className='flex-1 h-full outline-none' />
        </div>

        <div className='w-full border rounded-xl h-10 overflow-hidden drop-shadow-md gap-2 bg-white flex pl-2 items-center '>
          <FmdGoodIcon />
          <input type="text" placeholder='where do u live' className='flex-1 h-full outline-none' />
        </div>
        <div className='w-full flex justify-center'>
        <button className='button bg-prime text-white px-8 w-full md:w-fit'>
          Sing Up
        </button>
        </div>
        <div className='flex gap-2'>
          you have aleardy an acount  ? <Link className='text-prime' to={"/signin"}>Sign in</Link>
        </div>
      </form>
    </div>
  )
}