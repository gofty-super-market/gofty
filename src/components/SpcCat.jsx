import React, { useContext } from 'react'
import Card from './Card';
import GoftyOffer from './GoftyOffer'
import { Splide, SplideSlide } from "@splidejs/react-splide"
import { Link, useParams } from 'react-router-dom';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import { IconButton } from '@mui/material';

import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SearchOffIcon from '@mui/icons-material/SearchOff';

import Img1 from "../imgs/productsImgs/1.jpg";

import { useState } from 'react';
import axios from "axios"
import { useEffect } from 'react';

import { animate, motion, useAnimation } from "framer-motion"
import { CatsContext } from '../context/cats';


const api = axios.create({
    baseURL: "https://goftysupermarketelectronic.com/api"
})
// https://goftysupermarketelectronic.com/api/products-1-page-1
function SpcCat() {

    const { cat } = useParams();
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const animation = useAnimation()
    const [page, setPage] = useState(1);
    const { cats, setCats } = useContext(CatsContext)

    useEffect(() => {
        animation.start({ y: 200 })
        setTimeout(() => {
            animation.start({ y: 0 })
        }, 50);
    }, [cat])


    const catId = ()=>{
        let a = cats.filter(catt=>catt.name == cat)
        return a[0].id_category
    }

    useEffect(() => {
        api.get("/products-" + catId() + "-page-" + page).then(res => setProducts(res.data))
    }, [page])
    useEffect(() => {
        api.get("/products-" + catId() + "-page-" + page).then(res => setProducts(res.data))
        setPage(1)
    }, [cat])

    const changePageBy=(i)=>{
        setPage(per=>per+i)
    }
    useEffect(() => {
        if(page<=1){
            setPage(1)
        }
    }, [page])
    
    const finalproducts = products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase())).map((product, key) => {
        return (

            <SplideSlide key={key}>
                <div className='mx-2 md:mx-4 my-2'>
                    <Card unite={product.unite} productId={product.id_product} img={product.image} title={product.title} description={product.description} price={product.price} />
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

                    <div className='flex flex-col justify-center items-center gap-3'>
                        <div
                            className='mx-auto flex flex-col w-full max-w-[1200px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                            {finalproducts}
                        </div>
                        <div className='flex gap-3 justify-center items-center bg-white rounded-full border'>
                            {
                                page > 1? 
                            <IconButton
                            onClick={()=>{changePageBy(-1)}} 
                            >
                                <KeyboardArrowLeftRoundedIcon />
                            </IconButton>
                           : 
                            <IconButton
                            >
                                <KeyboardArrowLeftRoundedIcon className='text-gray-300' />
                            </IconButton>
                            }
                            <div>Page {page}</div>

                            <IconButton
                            onClick={()=>{changePageBy(1)}}
                            >
                                <ChevronRightRoundedIcon />
                            </IconButton>
                        </div>
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