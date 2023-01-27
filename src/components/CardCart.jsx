import { CartContext } from '../context/cartContext';
import { useEffect } from 'react';

import React, { useContext } from 'react'
import { useState } from 'react'

import { IconButton } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

import { EditContext } from '../context/edit';
import { UpdateCart } from '../context/updateCart';
import { Link } from 'react-router-dom';
import axios from "axios"

const api = axios.create({
    baseURL: "https://goftysupermarketelectronic.com/api"
})


export default function CardCart({ productId, title, price, quantity, unite, id_cart, image }) {
    const [product, setProduct] = useState([])
    const { cart, setCart } = useContext(CartContext)
    const { edit, setEdit } = useContext(EditContext)
    const { updateCart, setUpdateCart } = useContext(UpdateCart)

    const handelQP = () => {
        var cartFormData = new FormData();
        cartFormData.append('id_client', 1)
        cartFormData.append('id_product', productId)
        cartFormData.append('quantity', Number(quantity) + 1)
        cartFormData.append('unite', unite)
        api(
            {
                method: "post",
                url: "cart-update",
                data: cartFormData,
                headers: { "Content-Type": "multipart/form-data" },
            }
        ).then(() => {
            setUpdateCart(p => p + 1)
        })
    }
    const handelQM = () => {
        if (quantity>1) {
            var cartFormData = new FormData();
            cartFormData.append('id_client', 1)
            cartFormData.append('id_product', productId)
            cartFormData.append('quantity', Number(quantity) - 1)
            cartFormData.append('unite', unite)
            api(
                {
                    method: "post",
                    url: "cart-update",
                    data: cartFormData,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            ).then(() => {
                setUpdateCart(p => p + 1)
            })
        }
    }

    const handelRemove = (id) => {
            var cartFormData = new FormData();
            cartFormData.append('id_cart', id_cart)
            api(
                {
                    method: "post",
                    url: "cart-delete",
                    data: cartFormData,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            ).then(() => {
                setUpdateCart(p => p + 1)
            })
    }

    return (
        <div className='max-w-md flex gap-0 md:gap-4 border p-2 md:p-3 drop-shadow-md bg-white rounded-3xl'>
            <Link to={"/market/product/" + productId}>
                <div className='w-28 md:w-32 h-full md:h-28 overflow-hidden flex items-center justify-center'>
                    <img src={"https://goftysupermarketelectronic.com/" + image} alt="" />
                </div>
            </Link>
            <div className='flex-1 p-3 flex flex-col'>
                <h3 className='text-sm  font-medium '>{title}</h3>
                <p className='text-sm'>per {unite}</p>
                <h3 className='text-xl font-medium flex-1 flex items-end'>{price * quantity} DH</h3>
            </div>
            <div className='flex flex-col items-end justify-between'>
                <IconButton onClick={handelRemove} >
                    <CloseRoundedIcon sx={{ fontSize: 20 }} />
                </IconButton>
                <div className='hover:scale-105 flex flex-col-reverse md:flex-row items-center justify-center md:gap-1 drop-shadow-md bg-white rounded-full w-fit border '>
                    <IconButton onClick={() => handelQM()} ><RemoveRoundedIcon sx={{ fontSize: 20 }} /></IconButton>
                    <span className='font-medium text-gray-700'>{quantity}</span>
                    <IconButton onClick={() => handelQP()} ><AddRoundedIcon sx={{ fontSize: 20 }} /></IconButton>
                </div>
            </div>
        </div>

    )
}
