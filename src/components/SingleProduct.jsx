import React, { useState , useContext  } from 'react'
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { IconButton } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Link, useParams } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import Tooltip from '@mui/material/Tooltip';
import { Splide, SplideSlide } from "@splidejs/react-splide"
import WhatshotIcon from '@mui/icons-material/Whatshot';


import Card from './Card';

import Img1 from "../imgs/productsImgs/1.jpg";
import Img2 from "../imgs/productsImgs/2.jpg";
import Img4 from "../imgs/productsImgs/4.jpg";
import Img5 from "../imgs/productsImgs/5.jpg";
import axios from "axios"
import { useEffect } from 'react';

import { CartContext } from '../context/cartContext';
import { EditContext } from '../context/edit';

const Imgs = [Img1, Img2, Img4, Img5, Img1, Img2, Img4, Img1, Img2, Img4, Img5, Img1]

const api = axios.create({
    baseURL: "https://marrakech-quad-biking.com/demo/gofty/api"
})


function SingleProduct() {
    const [q, setQ] = useState(1)
    const { id } = useParams()
    const { cart, setCart } = useContext(CartContext)
    const { edit, setEdit } = useContext(EditContext)
    const [productInfo, setProductInfo] = useState([])
    console.log(id)
    useEffect(() => {
        api.get("/product-" + id).then(res => setProductInfo(res.data))
    }, [])

    const addtocart = () => {
        let newCart = cart;
        let alreadyAdded = false;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].productId == id) {
                newCart[i].q += q;
                setCart(newCart);
                alreadyAdded = true;
            }
        }
        if (!alreadyAdded) {
            setCart(a =>
                [{
                    productId:id, description:productInfo.description, price:productInfo.price, title:productInfo.title, img: Img1, q: q, miniInfo: "lorem epson"
                }, ...a]
            );
        }
    }

    const handelQChange = (i) => {
        if (q <= 1 && i == -1) {
            setQ(1);
        } else {
            setQ(q => q + i);
        }
    }

    const [favorite, setFavorite] = useState(false);
    return (

        <div className='mt-14 md:mt-20 select-none w-full max-w-[1200px] mx-auto px-5 drop-shadow-xl'>
            <Link to={'/market/Fruits'}><h1 className='py-3 text-2xl text-gray-700 font-medium'><ArrowBackRoundedIcon /> Fruits</h1></Link>


            <div className='border rounded-2xl bg-white overflow-hidden flex flex-col md:flex-row items-center gap-0 md:gap-4'>
                <div className='flex-1  flex items-center justify-center'>
                    <img className='h-[300px] md:h-full' src={Img1} alt="" />
                </div>
                <div className='w-[50%] md:w-1 h-1 md:h-36 bg-gray-200 rounded-md'></div>
                <div className='p-6 md:p-4 flex-1 h-full flex flex-col gap-2'>
                    <h2 className='text-3xl text-gray-700'>{productInfo.title}</h2>
                                        <p className=' md:pr-5 text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem,</p>
                    <h3>Product Name</h3>
                    <div className='hover:scale-105 flex items-center justify-center gap-1 drop-shadow-md bg-white rounded-full w-fit border '>
                        <IconButton onClick={() => handelQChange(-1)}><NavigateBeforeRoundedIcon /></IconButton>
                        <span className='font-medium text-gray-700'>{q}</span>
                        <IconButton onClick={() => handelQChange(1)}><NavigateNextRoundedIcon /></IconButton>
                    </div>
                    <h3 className='py-3 text-3xl font-medium text-gray-700'>{productInfo.price * q} DH</h3>
                    <div className='flex-1 flex gap-2 justify-center sm:justify-start'>
                        <Tooltip title="add to favoret" arrow >
                            <button onClick={() => setFavorite(!favorite)} className='hover:bg-[#f1f1f1] button bg-white  drop-shadow-md border text-[#F39221] p-2'>{favorite ? <FavoriteRoundedIcon /> : <FavoriteBorderIcon />} </button>
                        </Tooltip>
                        <button className='flex-1 sm:flex-none hover:scale-105 ease-in-out duration-300 button bg-[#95BF6D] text-white text-xs md:text-md '> Buy now </button>
                        <button className=' sm:flex-none hover:scale-105 ease-in-out duration-300 button bg-gray-600 text-white text-xs md:text-md' onClick={()=>addtocart()}><AddRoundedIcon /> Add to cart</button>
                    </div>
                </div>
            </div>



            <h1 className='py-3 text-2xl text-gray-700 mt-6 font-medium'>Rolated Products</h1>
            <div className='mx-auto w-full max-w-[1200px]'>
                <Splide className='py-3' options={{
                    perPage: 5,
                    arrows: false,
                    gap: 0,
                    breakpoints: {
                        640: {
                            perPage: 2,
                        }
                        ,
                        850: {
                            perPage: 3,
                        },
                        1200: {
                            perPage: 4,
                        }
                    }
                }}>
                    {
                        Imgs.map((img, key) => {
                            return (
                                <SplideSlide key={key}>
                                    <div className='mx-2 md:mx-4 my-2'>
                                        <Card img={img} />
                                    </div>
                                </SplideSlide>
                            )
                        })
                    }
                </Splide>
            </div>



            <h1 className='py-3 text-2xl text-gray-700 mt-6 font-medium'><WhatshotIcon /> Best seller</h1>
            <div className='mx-auto w-full max-w-[1200px]'>
                <Splide className='py-3' options={{
                    perPage: 5,
                    arrows: false,
                    gap: 0,
                    breakpoints: {
                        640: {
                            perPage: 2,
                        }
                        ,
                        850: {
                            perPage: 3,
                        },
                        1200: {
                            perPage: 4,
                        }
                    }
                }}>
                    {
                        Imgs.map((img, key) => {
                            return (
                                <SplideSlide key={key}>
                                    <div className='mx-2 md:mx-4 my-2'>
                                        <Card img={img} />
                                    </div>
                                </SplideSlide>
                            )
                        })
                    }
                </Splide>
            </div>



        </div>

    )
}

export default SingleProduct