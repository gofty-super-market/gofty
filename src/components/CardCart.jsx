import { CartContext } from '../context/cartContext';
import { useEffect } from 'react';

import React, { useContext } from 'react'
import { useState } from 'react'

import { IconButton } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

import { EditContext } from '../context/edit';
import { Link } from 'react-router-dom';

export default function CardCart(product) {

  const { cart, setCart } = useContext(CartContext)

  const { edit, setEdit } = useContext(EditContext)

  const handelQChange = (qo,id)=>{
      let newCart = cart;
      for (let i = 0; i < cart.length; i++) {
          if(cart[i].productId === id ){
              
              newCart[i].q+=qo;
              if(newCart[i].q<=0){
                newCart[i].q=1
              }
              setCart(newCart);
            }
        }
        setEdit(ee=>ee+1)
  }
  const handelRemove = (id)=>{
    let newCart = cart.filter((product)=>{
        return product.productId != id
    })
    setCart(newCart)
  }
    return (
        <div key={product.productId} className='max-w-md flex gap-0 md:gap-4 border p-2 md:p-3 drop-shadow-md bg-white rounded-3xl'>
            <Link to={"/market/product/"+product.productId}>
            <div className='w-28 md:w-32 h-full md:h-28 overflow-hidden flex items-center justify-center'>
                <img src={product.img} alt="" />
            </div>
            </Link>
            <div className='flex-1 p-3 flex flex-col'>
                <h3 className='text-sm  font-medium '>{product.title}</h3>
                <p className='text-sm'>{product.miniInfo}</p>
                <h3 className='text-xl font-medium flex-1 flex items-end'>{product.price * product.q} DH</h3>
            </div>
            <div className='flex flex-col items-end justify-between'>
                <IconButton onClick={() => handelRemove(product.productId)} >
                    <CloseRoundedIcon sx={{ fontSize: 20 }} />
                </IconButton>
                <div className='hover:scale-105 flex flex-col-reverse md:flex-row items-center justify-center md:gap-1 drop-shadow-md bg-white rounded-full w-fit border '>
                    <IconButton onClick={() => handelQChange(-1, product.productId)} ><RemoveRoundedIcon sx={{ fontSize: 20 }} /></IconButton>
                    <span className='font-medium text-gray-700'>{product.q}</span>
                    <IconButton onClick={() => handelQChange(1, product.productId)} ><AddRoundedIcon sx={{ fontSize: 20 }} /></IconButton>
                </div>
            </div>
        </div>

    )
}
