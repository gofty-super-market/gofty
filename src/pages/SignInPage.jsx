import React, { useContext, useState } from 'react'
import logo from "../imgs/logo.png"
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
import axios from "axios"
import { UserId } from '../context/userId';
import { UpdateCart } from '../context/updateCart';
import { useNavigate } from 'react-router-dom';


const api = axios.create({
  baseURL: "https://goftysupermarketelectronic.com/api"
})


export default function SignInPage() {
  const navigate = useNavigate()

  const { updateCart, setUpdateCart } = useContext(UpdateCart)

  const { userId, setUserId } = useContext(UserId)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const singInCheck = (event) => {

    let cartFormData = new FormData();
    cartFormData.append('email', email)
    cartFormData.append('password', password)

    console.log(cartFormData)
    event.preventDefault();
    api({
      method: "post",
      url: "signin",
      data: cartFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        if (response.data != "0") {
          localStorage.setItem("GoftyUserId", response.data)
          setUserId(response.data)
          setUpdateCart(p => p + 1)
          navigate('/welcome')
        }
      })
  }
  return (

    <motion.div initial={{ y: 100, opacity: .5 }} animate={{ y: 0, opacity: 1 }} className='text-gray-700 my-16 mb-0 md:mb-28 md:my-28 flex items-center justify-center'>
      <form onSubmit={singInCheck} className='gap-5 p-6 py-8 md:py-12 flex flex-col items-center w-full max-w-lg rounded-3xl  ' action="">
        <h1 className='text-3xl font-medium'>Sing In</h1>
        <h1>Welcome back to gofty </h1>
        <div className='w-full border-2 border-gray-300 rounded-xl h-10 overflow-hidden gap-2 bg-white flex pl-2 items-center  '>
          <EmailIcon />
          <input onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder='Your Email' className='flex-1 h-full outline-none' />
        </div>
        <div className='w-full border-2 border-gray-300 rounded-xl h-10 overflow-hidden gap-2 bg-white flex pl-2 items-center  '>
          <HttpsIcon />
          <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Your Email' className='flex-1 h-full outline-none' />
        </div>

        <div className='w-full flex items-center justify-center flex-col'>
          <button
            className='button bg-prime text-white px-8 w-full md:w-fit'>
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