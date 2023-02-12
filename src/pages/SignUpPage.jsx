import React, { useContext, useState } from 'react'
import logo from "../imgs/logo.png"
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import { Link, useNavigate } from 'react-router-dom';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import { motion } from "framer-motion"
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import {useFormik} from "formik"
import * as Yup from "yup"
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import EmailCode from '../components/EmailCode';
import axios from "axios"
import { UpdateCart } from '../context/updateCart';
import { UserId } from '../context/userId';


const api = axios.create({
  baseURL: "https://goftysupermarketelectronic.com/api"
})

export default function SignInPage() {
  const navigate = useNavigate()
  const { updateCart, setUpdateCart } = useContext(UpdateCart)
  const { userId, setUserId } = useContext(UserId)

  const [code , setCode]=useState(false)
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const formik = useFormik({
    initialValues:{
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      confirm:"",
      tel:"",
      address:"",
    },
    validationSchema:Yup.object({
      firstName: Yup.string().max(15 , "Must be 15 characters or less").required("Required"),
      lastName: Yup.string().max(15 , "Must be 15 characters or less").required("Required"),
      email: Yup.string().email("Invalud email address").required("Required"),
      password: Yup.string().max(20,"password is too long").required("Required").min(8, 'Password is too short'),
      confirm: Yup.string().max(20,"password is too long").required("Required").min(8, 'Password is too short').oneOf([Yup.ref('password'), null], 'Passwords must match'),
      tel: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Required"),
      address: Yup.string().required("Required"),
    }),
    onSubmit:(values)=>{

          
    let cartFormData = new FormData();
    cartFormData.append('name', formik.values.firstName + " " +  formik.values.lastName)
    cartFormData.append('email', formik.values.email)
    cartFormData.append('phone', formik.values.tel)
    cartFormData.append('address', formik.values.address)
    cartFormData.append('password',formik.values.password)
    console.log(cartFormData)
    api({
      method: "post",
      url: "signup",
      data: cartFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        if(response.data!="0"){
          localStorage.setItem("GoftyUserId",response.data)
          setUserId(response.data)
          setUpdateCart(p=>p+1)
          navigate('/welcome')
        }
      })
    }
  });

  return (

code?
  <EmailCode/>
:
    <motion.div
      initial={{ y: 100, opacity: .5 }}
      animate={{ y: 0, opacity: 1 }}
      className='text-gray-700 my-16 mb-0 md:mb-28 md:my-28 flex flex-col items-center justify-center'>

      <h1 className='text-3xl font-medium'>Sing Up</h1>
      <form onSubmit={formik.handleSubmit} className='gap-5 p-6 py-8 md:py-12 flex flex-col items-center w-full max-w-2xl rounded-3xl  ' action="">
        <div className='flex flex-col md:flex-row w-full gap-4'>

          <div className="w-full flex-1">
            <div className='w-full border-2 border-gray-300 rounded-xl h-10 overflow-hidden gap-2 bg-white flex pl-2 items-center '>
              <PersonIcon />
              <input 
              type="text" 
              name="firstName"
              placeholder='First name' 
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              className='flex-1 h-full outline-none w-full' />
            </div>
            {formik.touched.firstName && formik.errors.firstName? <span className='text-sm pt-2 px-2 text-red-400 flex items-center gap-2 '> <WarningRoundedIcon />{formik.errors.firstName}</span>:null}
          </div>

          <div className="w-full flex-1">
            <div className='w-full border-2 border-gray-300 rounded-xl h-10 overflow-hidden gap-2 bg-white flex pl-2 items-center  '>
              <PersonIcon />
              <input 
              type="text" 
              name="lastName"
              placeholder='Last name' 
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              className='flex-1 h-full outline-none w-full' />
            </div>
            {formik.touched.lastName && formik.errors.lastName? <span className='text-sm pt-2 px-2 text-red-400 flex items-center gap-2 '> <WarningRoundedIcon />{formik.errors.lastName}</span>:null}
          </div>

        </div>

        <div className="w-full">
          <div className='w-full border-2 border-gray-300 rounded-xl h-10 overflow-hidden gap-2 bg-white flex pl-2 items-center  '>
            <EmailIcon />
              <input 
              type="email" 
              name="email"
              placeholder='Email' 
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              className='flex-1 h-full outline-none' />
          </div>
            {formik.touched.email && formik.errors.email? <span className='text-sm pt-2 px-2 text-red-400 flex items-center gap-2 '> <WarningRoundedIcon />{formik.errors.email}</span>:null}
        </div>

        <div className='flex flex-col md:flex-row w-full gap-4'>
          <div className="w-full">
            <div className='w-full border-2 border-gray-300 rounded-xl h-10 overflow-hidden gap-2 bg-white flex pl-2 items-center  '>
              <HttpsIcon />
              <input 
              type="password" 
              name="password"
              placeholder='Password' 
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              className='flex-1 h-full outline-none w-full ' />
            </div>
            {formik.touched.password && formik.errors.password? <span className='text-sm pt-2 px-2 text-red-400 flex items-center gap-2 '> <WarningRoundedIcon />{formik.errors.password}</span>:null}
          </div>

          <div className="w-full">
            <div className='w-full border-2 border-gray-300 rounded-xl h-10 overflow-hidden gap-2 bg-white flex pl-2 items-center  '>
              <HttpsIcon />
              <input 
              type="password" 
              name="confirm"
              placeholder='Confirm' 
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.confirm}
              className='flex-1 h-full outline-none w-full' />
            </div>
            {formik.touched.confirm && formik.errors.confirm? <span className='text-sm pt-2 px-2 text-red-400 flex items-center gap-2 '> <WarningRoundedIcon />{formik.errors.confirm}</span>:null}
          </div>
        </div>

        <div className="w-full">
          <div className='w-full border-2 border-gray-300 rounded-xl h-10 overflow-hidden gap-2 bg-white flex pl-2 items-center  '>
            <LocalPhoneIcon />
              <input 
              type="tel" 
              name="tel"
              placeholder='Tel' 
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.tel}
              className='flex-1 h-full outline-none' />
            </div>
            {formik.touched.tel && formik.errors.tel? <span className='text-sm pt-2 px-2 text-red-400 flex items-center gap-2 '> <WarningRoundedIcon />{formik.errors.tel}</span>:null}
        </div>

        <div className="w-full">
          <div className='w-full border-2 border-gray-300 rounded-xl h-10 overflow-hidden gap-2 bg-white flex pl-2 items-center  '>
            <FmdGoodIcon />
              <input 
              type="text" 
              name="address"
              placeholder='Address' 
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.address}
              className='flex-1 h-full outline-none' />
            </div>
            {formik.touched.address && formik.errors.address? <span className='text-sm pt-2 px-2 text-red-400 flex items-center gap-2 '> <WarningRoundedIcon />{formik.errors.address}</span>:null}
        </div>

        <div className='w-full flex justify-center'>
          <button onClick={()=>{setCode(false)}} type='submit' className='button bg-prime text-white px-8 w-full md:w-fit'>
            Sing Up
          </button>
        </div>
        <div className='flex gap-2'>
          you have aleardy an acount  ? <Link className='text-prime' to={"/signin"}>Sign in</Link>
        </div>
      </form>
    </motion.div>

  )
}