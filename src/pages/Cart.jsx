import { IconButton } from '@mui/material'
import React, { useContext } from 'react'
import { useState } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import Img1 from "../imgs/productsImgs/1.jpg";
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cartContext';
import { EditContext } from '../context/edit';
import { UserId } from '../context/userId';
import { useEffect } from 'react';
import CardCart from '../components/CardCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import AlertDialog from '../components/Alert';
import { motion } from "framer-motion"

import { UpdateCart } from '../context/updateCart';
import axios from "axios"

const api = axios.create({
    baseURL: "http://ayshadashboard.com/api"
})


function Cart() {
  const [search, setSearch] = useState("");
  const { cart, setCart } = useContext(CartContext)
  const { userId, seUserId } = useContext(UserId)
  const { edit, setEdit } = useContext(EditContext)
  const [products, setProducts] = useState()
  const [delivery, setDelivery] = useState(0)
    const { updateCart, setUpdateCart } = useContext(UpdateCart)
  const [Vcart, setVcart] = useState(cart)

  const price = () => {
    let p = 0;
    for (let i = 0; i < cart.length; i++) {
      p += cart[i].quantity * cart[i].product.price
    }
    return p
  }


  if (Vcart !== cart) {
    setVcart(cart);
  }
  useEffect(() => {
    setEdit(ee => ee + 1)
    if (cart.length) {
      setDelivery(20)
    } else {
      setDelivery(0)
    }
  }, [cart])
  useEffect(() => {
    setEdit(ee => ee + 1)
    console.log(cart)
  }, [search])
  // .filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
  useEffect(() => {
    setProducts(cart.filter(product=>product.product.title.toLowerCase().includes(search.toLowerCase())).map((product, key) => {
      return (
        <CardCart
          key={key}
          title={product.product.title}
          productId={product.product.id_product}
          price={product.product.price}
          image={product.product.image}
          quantity={product.quantity}
          unite={product.unite}
          id_cart={product.id_cart}
        />
      )
    }))
  }, [edit])
  const cleanCart = ()=>{
            var cartFormData = new FormData();
            cartFormData.append('id_client', userId);
            api(
                {
                    method: "post",
                    url: "cart-clean",
                    data: cartFormData,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            ).then(() => {
                setUpdateCart(p => p + 1)
            })

  }

  return (
    <motion.div initial={{ y: 300, opacity: .5 }} animate={{ y: 0, opacity: 1 }} className="mx-auto max-w-[1100px] w-full mt-16 md:mt-28 px-4 text-gray-700">
      <h1 className='text-3xl font-medium text-gray-700 py-8 md:py-2 flex items-center gap-2 justify-center md:justify-start'><LocalMallRoundedIcon /> Shopping cart</h1>
      <div className='flex gap-4 flex-col md:flex-row'>
        <div className='flex-1 p-3 md:p-0'>
          <h3 className='text-xl py-2 font-medium text-gray-700'>{cart.length} products</h3>
          <div className=' overflow-hidden border my-2 rounded-full max-w-xs w-full  h-11 flex items-center gap-2 px-1 text-gray-600 drop-shadow-md bg-white'>
            <IconButton><SearchRoundedIcon className='cursor-pointer '></SearchRoundedIcon></IconButton>
            <input value={search} onChange={(e) => { setSearch(e.target.value) }} className='flex-1 outline-none h-full ' type="text" />
            <IconButton className={(search ? " scale-100 " : " scale-0 ")}><CancelSharpIcon onClick={() => { setSearch("") }} className='cursor-pointer ease-in-out duration-300'></CancelSharpIcon></IconButton>
          </div>

          <div className='mt-6 flex flex-col gap-6'>
            {
              products != "" ? products : search ?
                <h1 className=' felx justify-center items-center text-2xl gap-2 w-full'>
                  <SearchOffRoundedIcon />
                  <span> no results </span>
                </h1>
                :
                <h1 className=' felx justify-center items-center text-2xl gap-2 w-full'>
                  <ShoppingCartRoundedIcon />
                  <span> empty cart </span>
                </h1>
            }
          </div>
          <div className='flex gap-3 py-6 flex-col md:flex-row items-center'>
            <Link to={"/market"}>
              <button className='button bg-prime ease-in-out duration-200 text-white flex items-center justify-center gap-2 hover:gap-3'>Continue shopping <ArrowForwardIcon /> </button>
            </Link>
            {
            cart.length!=0 &&
            <AlertDialog cleanCart={cleanCart}></AlertDialog>
            }
          </div>

        </div>

        <div className='flex-1 relative'>

          <motion.div className='border select-none bg-white flex flex-col gap-3 drop-shadow-xl w-full rounded-3xl p-5 md:p-8 md:sticky top-20'>
            <div className='flex md:items-center mb-3 flex-col md:flex-row gap-3 md:gap-0'>
              <div className='flex-1'>
                <h4 className='text-lg text-gray-500'><SellRoundedIcon /> total Price</h4>
                <h1 className='text-[3rem] font-medium text-gray-600'>{price() == 0 ? "0" : price() + delivery} DH</h1>
              </div>
              <div className='text-gray-500'>
                <div className='flex w-full justify-between gap-3 '>
                  <h2>Price:</h2>
                  <h2>{price() == 0 ? "0" : price()} DH</h2>
                </div>
                <div className='flex w-full justify-between gap-3'>
                  <h2>delivery :</h2>
                  <h2>{delivery} DH</h2>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <p className=' p-5 text-sm text-gray-600 border-l-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, officiis deserunt qui maxime nihil tempore et,</p>
              <div className='drop-shadow-md bg-white overflow-hidden text-gray-600 flex items-center border rounded-full h-10 px-3 gap-3'>
                <PersonRoundedIcon />
                <input placeholder='Enter your name' className='text-sm flex-1 outline-none h-full ' type="text" />
              </div>
              <div className='drop-shadow-md bg-white overflow-hidden text-gray-600 flex items-center border rounded-full h-10 px-3 gap-3'>
                <LocalPhoneRoundedIcon />
                <input placeholder='Enter phone number' className='text-sm flex-1 outline-none h-full ' type="text" />
              </div>
              <div className='drop-shadow-md bg-white overflow-hidden text-gray-600 flex items-center border rounded-full h-10 px-3 gap-3'>
                <RoomRoundedIcon />
                <input placeholder='Enter your location' className='text-sm flex-1 outline-none h-full ' type="text" />
              </div>

              {
                price() ?
                  <div className='flex gap-2 justify-center md:justify-end items-center mt-5'>
                    <button className='flex-1 md:flex-none button bg-prime ease-in-out duration-200 text-white flex items-center justify-center gap-2 hover:gap-3 hover:opacity-90'>Check out <ArrowForwardIcon /> </button>
                  </div>
                  : ""
              }
            </div>
          </motion.div>
        </div>




      </div>
    </motion.div>
  )
}

export default Cart