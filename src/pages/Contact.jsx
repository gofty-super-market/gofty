import React, { useState } from 'react'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { CircularProgress } from '@mui/material';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

import { motion } from "framer-motion"

function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);


  const [firstName, setFirstName] = useState("")






  const handleSend = (event) => {
    event.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true)
    }, 2000);
  }
  return (
    <motion.div
      initial={{ y: 100, opacity: .5 }} animate={{ y: 0, opacity: 1 }}
      className='mt-20 select-none w-full max-w-[1200px] mx-auto px-5 text-gray-700'>
      <h1 className='py-4 md:py-8 text-3xl font-medium'>Contact Us</h1>
      <h3 className='py-4 md:py-5 text-1xl md:text-2xl font-medium'>wanna ask something ?</h3>
      <div className='flex w-full gap-10 flex-col md:flex-row'>
        <div className='flex-1'>
          <form action="" className='flex flex-col gap-3' onSubmit={handleSend}>
            <div className='flex gap-3 flex-col md:flex-row '>
              <input placeholder='first name' type="text" className='input flex-1' />
              <input placeholder='last name' type="text" className='input flex-1' />
            </div>
            <div className='flex gap-3 flex-col md:flex-row'>
              <input placeholder='tele' type="number" className='input flex-1' />
              <input placeholder='city' type="text" className='input flex-1' />
            </div>
            <div className='flex flex-col'>
              <input placeholder='Your email' type="email " className='input' />
            </div>
            <div className='flex flex-col'>
              <textarea placeholder='Your message' className=' input' name="" id="" cols="30" rows="10"></textarea>
            </div>
            <button className='md:w-fit py-3 bg-prime button text-white flex justify-center items-center gap-3'>
              {
                sending ?
                  <><CircularProgress size={25} color="inherit" /> Sending </> :
                  sent ?
                    <>Message sent <DoneRoundedIcon /></> :
                    <>Send message <SendRoundedIcon /></>
              }
            </button>
          </form>
        </div>
        <div className='flex-1 h-fit bg-white rounded-3xl drop-shadow-lg p-5 md:p-10 text-gray-700'>
          <h3 className='text-2xl font-medium py-2'>Our contact info</h3>
          <p className='text-sm md:text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
          <ul className='flex flex-col gap-5 py-8 text-gray-700 '>
            <li><LocalPhoneIcon /> lorem ipsum </li>
            <li><EmailRoundedIcon /> lorem ipsum </li>
            <li><WhatsAppIcon /> lorem ipsum </li>
            <li><InstagramIcon /> lorem ipsum </li>
            <li><RoomRoundedIcon /> lorem ipsum </li>
          </ul>
        </div>
      </div>

    </motion.div>
  )
}

export default Contact