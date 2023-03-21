import React, { useState } from 'react'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Splide , SplideSlide } from "@splidejs/react-splide"
import "@splidejs/splide/dist/css/splide.min.css"
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion,useAnimation } from 'framer-motion';


const imgarray = [
    "https://images.unsplash.com/photo-1610444833641-0542660a4ed7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1610444833641-0542660a4ed7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1610444833641-0542660a4ed7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
]


const cardStyle = 'flex '
function GoftyOffer() {

    const { ref, inView } = useInView({
        threshold:window.innerWidth>500? 0.2 : 0 ,
    });
    const animation = useAnimation()
    useEffect(() => {
        if (inView) {
           animation.start({
            x:0,
            opacity:1
           }) 
        }else{
            animation.start({
                x:-300,
                opacity:0,
            })
        }
    }, [inView])

  return (
    <>
    <motion.div transition={{duration:.6}} animate={animation} ref={ref} className='flex flex-col justify-center my-10 '>
    <h1 className='mx-auto max-w-[1100px] uppercase text-2xl font-medium text-gray-700 ml-5'><LocalOfferIcon/> special offers</h1>
        <Splide options={{
            perPage:1,
            type   : 'loop',
        }}>

        {
            imgarray.map((img,id)=>{
                return(
                    <SplideSlide key={id}>
                    <div className="my-10 mx-auto drop-shadow-xl bg-white flex flex-col md:flex-row overflow-hidden h-fit w-[85%] md:h-[300px] rounded-3xl border">
                        <div className='w-full md:w-[400px] h-[300px] md:h-full overflow-hidden flex-none md:flex-1 '>
                            <img  className='w-full h-full ease-in-out duration-300 hover:scale-105 flex-1 object-cover '  src={img} alt="" />
                        </div>
                        <div className='p-4 md:p-6  flex flex-col gap-2 flex-1'>
                            <h3 className='text-2xl font-medium text-gray-700'>Offer name</h3>
                            <h4 className='text-3xl font-medium text-gray-700'>99 DH </h4>
                            <p className='max-w-none md:max-w-lg flex-1 text-gray-600 text-sm '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque in voluptas omnis amet, sed cum recusandae </p>
                            <div className='flex gap-2 justify-center md:justify-end pt-2'>
                                <button className='hover:bg-[#f1f1f1] button drop-shadow-md bg-white border text-gray-700 px-4 py-2'> order now <ArrowForwardIcon/> </button>
                                <Tooltip title="add to cart" arrow >
                                    <button className='hover:bg-[#83a861] button drop-shadow-md bg-[#95BF6D] border text-white p-2'> <AddIcon/> </button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    </SplideSlide>
                )
            })
        }


        </Splide>

    </motion.div>
    </>

  )
}

export default GoftyOffer