import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { Alert, CircularProgress } from '@mui/material';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import { AddToCart } from '../context/addToCart';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import Img from "../../src/imgs/productsImgs/1.jpg";



import { useInView } from 'react-intersection-observer';
import { motion,useAnimation } from 'framer-motion';

function Card({ img, title, price, description, productId }) {
    const [added, setAdded] = useState(false);
    const [skeliton, setSkeliton] = useState(true);
    const { cart, setCart } = useContext(CartContext);
    const { addtocart, setAddToCart } = useContext(AddToCart);


    const { ref, inView } = useInView({
        threshold:0.3
    });
    const animation = useAnimation()
    useEffect(() => {
        if (inView) {
           animation.start({
            y:0,
            opacity:1
           }) 
        }else{
            animation.start({
                y:200,
                opacity:0,
            })
        }
    }, [inView])

    useEffect(() => {
        setSkeliton(true)
        setTimeout(() => {
            setSkeliton(false)
        }, 800);
    }, [productId])

    const addtocartHandler = () => {
        setAddToCart(pre => pre + 1)
        let newCart = cart;
        let alreadyAdded = false;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].productId == productId) {
                newCart[i].q += 1;
                setCart(newCart);
                alreadyAdded = true;
            }
        }
        if (!alreadyAdded) {
            setCart(a =>
                [{
                    productId, description, price, title, img: Img, q: 1, miniInfo: "lorem epson"
                }, ...a]
            );
        }
        setQ(pre => pre + 1)
    }

    const getProduct = cart.filter(item => {
        return item.productId == productId
    })

    const [q, setQ] = useState(0);
    useEffect(() => {
        if (getProduct.length != 0) {
            setQ(getProduct[0].q)
        } else {
            setQ(0)
        }
    }, [])
    useEffect(() => {
        if (q===0) {
            setCart(cart.filter((item) => {
                return item.productId != productId
            }))
        } 
    }, [q])
    

    const removefromcartHandler = () => {
        console.log(q)
        let newCart = cart;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].productId == productId) {
                newCart[i].q -= 1;
                setCart(newCart);
            }
        }
        setQ(pre => pre - 1)
        setAddToCart(pre => pre + 1)
    }

    return (
        !skeliton ?
            <motion.div transition={{duration:.6}} ref={ref} className='relative mx-auto card flex flex-col' >
                {
                    q !== 0 &&
                    <div className='z-10 absolute bg-prime right-3 top-3 w-6 h-6 rounded-full flex justify-center items-center text-white'>
                        {q}
                    </div>
                }
                <Link to={"/market/product/" + productId}>
                    <div className='flex-1 flex items-center justify-center overflow-hidden'>
                        <img className='h-[150px] md:h-[200px] object-cover' src={img} alt="" />
                    </div>
                </Link>
                <div className='flex-1 p-3 sm:p-4 flex flex-col'>
                    <Link to={"/market/product/" + productId}>
                        <h3 className='text-xs md:text-base font-medium text-gray-700'>{title}</h3>
                        <p className='text-xs md:text-xs text-gray-600 flex-1'>{description ? description : "no description"}</p>
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
                        <button onClick={() => addtocartHandler()} className='button p-2  cardBtn drop-shadow-md hover:bg-[#85a864] bg-[#95BF6D] text-white rounded-xl'>
                            <AddIcon />
                        </button>
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