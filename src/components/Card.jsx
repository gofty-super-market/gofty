import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import axios from "axios"
import { Alert, CircularProgress } from '@mui/material';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import { UpdateCart } from '../context/updateCart';
import { EditContext } from '../context/edit';
import { AddToCart } from '../context/addToCart';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import { UserId } from '../context/userId';

const api = axios.create({
    baseURL: "https://goftysupermarketelectronic.com/api"
})

function Card({ img, title, price, description, productId }) {
    const [added, setAdded] = useState(false);
    const [skeliton, setSkeliton] = useState(true);
    const { updateCart, setUpdateCart } = useContext(UpdateCart)
    const { userId, setUserId } = useContext(UserId)
    const { cart, setCart } = useContext(CartContext);
    const { addtocart, setAddToCart } = useContext(AddToCart);
    const [loading , setLoading ] = useState(false)

    const { ref, inView } = useInView({
        threshold: 0.3
    });
    const animation = useAnimation()
    useEffect(() => {
        if (inView) {
            animation.start({
                y: 0,
                opacity: 1
            })
        } else {
            animation.start({
                y: 200,
                opacity: 0,
            })
        }
    }, [inView])

    useEffect(() => {
        setSkeliton(true)
        setTimeout(() => {
            setSkeliton(false)
        }, 800);
    }, [productId])

    const getProduct =cart? cart.filter(item => {
        return item.product.id_product == productId
    }): false


    const isAdded = () => {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].product.id_product == productId) {
                return true
            }
        }
        return false
    }
    const addtocartHandler = () => {
        setLoading(true)
        if (isAdded()) {
            var cartFormData = new FormData();
            cartFormData.append('id_client', userId)
            cartFormData.append('id_product', productId)
            cartFormData.append('quantity', Number(getProduct[0].quantity) + 1)
            cartFormData.append('unite', "itme")
            api(
                {
                    method: "post",
                    url: "cart-update",
                    data: cartFormData,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            ).then(() => {
                setUpdateCart(p => p + 1);
                setAddToCart(pre => pre + 1);
                setQ(pre => pre + 1)
            }).then(()=>{
                setLoading(false)
            })

        } else {
            var cartFormData = new FormData();
            cartFormData.append('id_client', userId)
            cartFormData.append('id_product', productId)
            cartFormData.append('quantity', 1)
            cartFormData.append('unite', "itme")
            api(
                {
                    method: "post",
                    url: "cart-new",
                    data: cartFormData,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            ).then(() => {
                setUpdateCart(p => p + 1);
                setAddToCart(pre => pre + 1);
                setQ(pre => pre + 1)
            }).then(()=>{
                setLoading(false)
            })
        }
    }
    const [q, setQ] = useState(0);

    useEffect(() => {
        if (getProduct.length != 0) {
            setQ(Number(getProduct[0].quantity))
        } else {
            setQ(0)
        }
    }, [cart])

    const removefromcartHandler = () => {
        var cartFormData = new FormData();
        cartFormData.append('id_client', userId)
        cartFormData.append('id_product', productId)
        cartFormData.append('quantity', Number(getProduct[0].quantity) - 1)
        cartFormData.append('unite', "itme")
        api(
            {
                method: "post",
                url: "cart-update",
                data: cartFormData,
                headers: { "Content-Type": "multipart/form-data" },
            }
        ).then(() => {
            setAddToCart(pre => pre + 1);
            if (q === 1) {
                var cartFormData = new FormData();
                cartFormData.append('id_cart', getProduct[0].id_cart)
                api(
                    {
                        method: "post",
                        url: "cart-delete",
                        data: cartFormData,
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                ).then(() => {
                    setUpdateCart(p => p + 1)
                    setQ(0)
                })
            } else {
                setQ(pre => pre - 1)
                setUpdateCart(p => p + 1);
            }
        })
    }

    return (
        !skeliton ?
            <motion.div transition={{ duration: .6 }} ref={ref} className='relative mx-auto card flex flex-col' >
                {
                    q !== 0 &&
                    <div className='z-10 absolute bg-prime right-3 top-3 w-6 h-6 rounded-full flex justify-center items-center text-white'>
                        {q}
                    </div>
                }
                <Link to={"/market/product/" + productId}>
                    <div className='flex-1 flex items-center justify-center overflow-hidden'>
                        <img className='h-[150px] md:h-[200px] object-contain' src={"https://goftysupermarketelectronic.com/" + img} alt="" />
                    </div>
                </Link>
                <div className='flex-1 p-3 sm:p-4 flex flex-col'>
                    <Link to={"/market/product/" + productId}>
                        <h3 className='text-xs md:text-base font-medium text-gray-700'>{title}</h3>
                        <p className='text-xs md:text-xs text-gray-600 flex-1'>{"no description"}</p>
                        <h2 className='text-base md:text-xl font-medium text-gray-700 w-full'>{price} DH</h2>
                    </Link>
                    <div className={'flex items-end mt-1 pt-2 ' + (q != 0 ? 'justify-between' : "justify-end")}>
                        {/* <Tooltip title="add to cart" arrow > */}
                        {
                            q !== 0 &&
                            <button onClick={() => removefromcartHandler()} className='button p-2  cardBtn drop-shadow-md hover:bg-red-500 bg-red-400 text-white rounded-xl '>
                                <RemoveRoundedIcon />
                            </button>
                        }
                        {!loading? 
                        <button onClick={() => { if(!loading){addtocartHandler()}}} className='button p-2  cardBtn drop-shadow-md hover:bg-[#85a864] bg-[#95BF6D] text-white rounded-xl'>
                            <AddIcon />
                        </button>:
                        <button className='button p-2  cardBtn drop-shadow-md hover:bg-[#85a864] bg-[#95BF6D] text-[#85a864] rounded-xl'>
                            <AddIcon />
                        </button>
                        }
                        {/* </Tooltip> */}
                    </div>
                </div>
                {/* <img className='absolute w-10' src={img} alt="" /> */}
            </motion.div>
            :
            <>
                <Stack spacing={1} className="rounded-3xl overflow-hidden">
                    <Skeleton variant="rectangular" height={210} />
                    <div className='p-2'>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        <div className='flex justify-between items-end'>
                            <Skeleton width={50} height={20} />
                            <Skeleton variant="circular" width={40} height={40} />
                        </div>
                    </div>
                </Stack>
            </>
    )
}

export default Card