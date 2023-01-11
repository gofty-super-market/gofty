import React from 'react'
import SpaIcon from '@mui/icons-material/Spa';
import HeroImg from "../imgs/HERO-FOR-GOFTY.png"
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Outlet, NavLink } from "react-router-dom";
import { motion } from "framer-motion"

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';

function Hero() {

    const { ref, inView } = useInView({
        threshold:0.4
    });
    const animation1 = useAnimation()
    const animation2 = useAnimation()
    useEffect(() => {
        if (inView) {
           animation1.start({
            x:0,
            opacity:1
           }) 
           animation2.start({
            x:0,
            opacity:1
           })
        }else{
            animation1.start({
                x:-200,
                opacity:0
            })
            animation2.start({
                x:200,
                opacity:0
            })
        }
    }, [inView])
    
    return (
        <div ref={ref} className='overflow-hidden mt-2 md:mt-14 select-none flex flex-col-reverse lg:flex-row  py-20 px-5 md:px-10 gap-4'>
            <motion.div  animate={animation1} className='flex-1 flex flex-col justify-center gap-4 items-center md:items-start text-center md:text-left'>
                <h1 className='select-none text-gray-600 text-[1.6rem] md:text-[3.3rem]'>GOFTY SUPERMARKET ELECTRONIC</h1>
                <h3 className='select-none text-[#8ab167] text-[1.3rem] flex items-center gap-2'><SpaIcon /> Super healthy</h3>
                <p className='select-none max-w-[450px] text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
                {/* 
            <form className='-z-1 flex flex-col gap-4 w-full '>
                <div className='border input-z drop-shadow-lg md:w-[80%] bg-white h-12 rounded-full flex overflow-hidden gap-3 items-center justify-center px-4'>
                    <MailIcon className='text-[#777]'/>
                    <input className=' text-[.8rem] flex-1 h-full outline-none' type="text" placeholder='Saisissez l’adresse de livraison.'/>
                </div>
                <div  className='border input-z drop-shadow-lg md:w-[80%] bg-white h-12 rounded-full flex overflow-hidden gap-3 items-center justify-center px-4'>
                    <PersonIcon className='text-[#777]'/>
                    <input className=' text-[.8rem] flex-1 h-full outline-none' type="text" placeholder='Livrer à'/>
                </div>
                    <p className='select-none text-sm text-gray-400 '>Connexion adresses récentes</p>
                </form> 
            */}

                <NavLink className="likeToGoUp" to={"/market"}>
                    <button className=' input-z hover:scale-105 ease-in-out duration-300 button max-w-sm bg-[#8ab167] w-full p-3 px-8 md:w-fit text-white font-light flex items-center justify-center gap-2'>shop now <ArrowForwardIcon /></button>
                </NavLink>
            </motion.div>
            <div className='flex-1 flex justify-center items-center'>
                <motion.img  animate={animation2} className='max-w-md  lg:max-w-none select-none w-full' src={HeroImg} alt="" />
            </div>
        </div>
    )
}

export default Hero 