import React from 'react'
import Card from './Card';
import GoftyOffer from './GoftyOffer'
import { Splide, SplideSlide } from "@splidejs/react-splide"
import { Link, useParams } from 'react-router-dom';


import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import { IconButton } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SearchOffIcon from '@mui/icons-material/SearchOff';

import Img1 from "../imgs/productsImgs/1.jpg";

import { useState } from 'react';
import axios from "axios"
import { useEffect } from 'react';

import { animate, motion, useAnimation } from "framer-motion"

const catList = {
    "Fruits": 1,
    "Légumes": 2,
    "Crémerie": 3,
    "Épicerie": 4,
    "Boissons": 5,
    "Hygiène": 6,
    "Pâtisserie": 7,
    "Food": 8,
    "Electro": 9
}

const api = axios.create({
    baseURL: "https://marrakech-quad-biking.com/demo/gofty/api"
})

function SpcCat() {

    const { cat } = useParams();
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const animation = useAnimation()

    useEffect(()=>{
        animation.start({y:200})
        setTimeout(() => {
            animation.start({y:0})
        }, 50);
    },[cat])
    useEffect(() => {
        api.get("/products-" + catList[cat]).then(res => setProducts(res.data))
    }, [cat])


    const finalproducts = products.filter((product) => product.title.includes(search)).map((product, key) => {
        return (
            <SplideSlide key={key}>
                <div className='mx-2 md:mx-4 my-2'>
                    <Card productId={product.id_product} img={Img1} title={product.title} description={product.description} price={product.price} />
                </div>
            </SplideSlide>
        )
    })

    return (
        <motion.div 
        animate={animation}
        className=' select-none w-full max-w-[1200px] mx-auto px-5 '>
            <h1 className='text-gray-700 mt-5 md:mt-10 mb-5 text-3xl font-medium flex items-center gap-2'> {cat} </h1>
            <div className=' overflow-hidden my-5 md:my-10 border rounded-full max-w-xs w-full h-11 flex items-center gap-2 px-1 text-gray-600 drop-shadow-md bg-white'>
                <IconButton><SearchRoundedIcon className='cursor-pointer '></SearchRoundedIcon></IconButton>
                <input value={search} onChange={(e) => { setSearch(e.target.value) }} className='flex-1 outline-none h-full ' type="text" />
                <IconButton className={(search ? " scale-100 " : " scale-0 ")}><CancelSharpIcon onClick={() => { setSearch("") }} className='cursor-pointer ease-in-out duration-300'></CancelSharpIcon></IconButton>
            </div>

            {
                search && <h1 className='text-xl font-medium px-3 text-gray-500'>{finalproducts.length} results</h1>
            }
            {
                finalproducts.length != 0 ?

                    <div
                        className='mx-auto w-full max-w-[1200px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                        {finalproducts}
                    </div>
                    :
                    search ?
                        <div className='py-16 flex flex-col gap-3 items-center justify-center'>
                            <SearchOffIcon className='text-gray-700' sx={{ fontSize: 75 }} />
                            <h1 className='text-lg font-medium'>0 result</h1>
                        </div>
                        :
                        <div className='py-16 flex flex-col gap-3 items-center justify-center'>
                            <SentimentVeryDissatisfiedIcon className='text-gray-700' sx={{ fontSize: 75 }} />
                            <h1 className='text-lg font-medium'>Sorry there is no products to show</h1>
                        </div>
            }
        </motion.div>

    )
}

export default SpcCat