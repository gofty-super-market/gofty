import React from 'react'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { Link } from 'react-router-dom';
import { Badge } from '@mui/icons-material';
import { CartContext } from '../context/cartContext';
import { AddToCart } from '../context/addToCart';
import { useContext } from 'react';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

export default function CartFlyBtn() {

    const { cart, setCart } = useContext(CartContext);
    const { addToCart, setAddToCart } = useContext(AddToCart);
    const animation = useAnimation()
    useEffect(() => {
        animation.start({
            scale: 1.2,
        })
        setTimeout(() => {
        animation.start({
            scale: 1,
        })
        }, 75);
    }, [addToCart])

    return (
        <Link to={"/cart"}>
            <motion.button
                // initial={{x:500}} animate={{x:cart.length? 0 : 500}}
                animate={animation}
                className='z-50 fixed right-3 md:right-5 bottom-3 md:bottom-10 p-4 bg-prime text-white rounded-full border border-gray-300 drop-shadow-2xl'>
                <LocalMallOutlinedIcon fontSize="medium" />
                <span className='absolute -top-1 -right-1  bg-white rounded-full border-2 font-medium border-gray-300 w-6 h-6 flex items-center justify-center text-prime'>{cart.length}</span>
            </motion.button>
        </Link>
    )
}
