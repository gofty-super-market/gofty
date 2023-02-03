import React from 'react'
import logo from "../imgs/logo.png"
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import { Link } from 'react-router-dom';
import {motion} from "framer-motion"
export default function SignInPage() {
  return (
    
    <motion.div initial={{y:100 , opacity:.5}} animate={{y:0,opacity:1}}  className='text-gray-700 my-16 mb-0 md:mb-28 md:my-28 flex items-center justify-center'>
      <form className='gap-5 p-6 py-8 md:py-12 flex flex-col items-center w-full max-w-lg rounded-3xl  ' action="">
        <h1 className='text-3xl font-medium'>Sing In</h1>
        <h1>Welcome back to gofty </h1>
        <div className='w-full border-2 border-gray-300 rounded-xl h-10 overflow-hidden gap-2 bg-white flex pl-2 items-center  '>
          <EmailIcon />
          <input type="text" placeholder='Your Email' className='flex-1 h-full outline-none' />
        </div>
        <div className='w-full border-2 border-gray-300 rounded-xl h-10 overflow-hidden gap-2 bg-white flex pl-2 items-center  '>
          <HttpsIcon />
          <input type="password" placeholder='Your Email' className='flex-1 h-full outline-none' />
        </div>

        <div className='w-full flex items-center justify-center flex-col'>
          <button className='button bg-prime text-white px-8 w-full md:w-fit'>
            Sing In
          </button>
        </div>
        <div className='flex gap-2'>
          you dont have an acount ? <Link className='text-prime' to={"/signup"}>Sign Up</Link>
        </div>
      </form>
    </motion.div>
  )
}