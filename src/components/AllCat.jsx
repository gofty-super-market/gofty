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
import { useState } from 'react';


import Img1 from "../imgs/productsImgs/1.jpg";
import Img2 from "../imgs/productsImgs/2.jpg";
import Img4 from "../imgs/productsImgs/4.jpg";
import Img5 from "../imgs/productsImgs/5.jpg";


import axios from "axios";
import { useEffect } from 'react';
import SingleCatSlider from './SingleCatSlider';


const api = axios.create({
    baseURL: "https://marrakech-quad-biking.com/demo/gofty/api"
})
const Imgs = [Img1, Img2, Img4, Img5, Img1, Img2, Img4, Img1, Img2, Img4, Img5, Img1]

const listOfCat = [
    ["Fruits", "/market/Fruits", 1],
    ["Légumes","/market/Légumes",2],
    ["Crémerie","/market/Crémerie",3],
    ["Épicerie","/market/Épicerie",4],
    ["Boissons","/market/Boissons",5],
    ["Hygiène","/market/Hygiène",6],
    ["Pâtisserie","/market/Pâtisserie",7],
    ["Food","/market/Food",8],
    ["Electro","/market/Electro",9],
]



function AllCat() {
    const [cats ,setCats]=useState([]);
    useEffect(() => {
        setCats([])
        listOfCat.map(cat=>{
            api.get("products-"+cat[2]).then(res=>{
            setCats(c=>[...c,res.data]);
        })
    })
    }, [])
    
    const [search , setSearch ]= useState()
    return (
        <div className='w-full max-w-[1200px] mx-auto px-5 '>
            <h1 className='text-gray-700 mt-5 md:mt-10 mb-5 text-3xl font-medium flex items-center gap-2'><StorefrontRoundedIcon /> Our Market</h1>
            <form className='my-5 md:my-10 border rounded-full  max-w-xs w-full h-11 flex items-center gap-2 px-1 text-gray-600 drop-shadow-md bg-white'>
                <IconButton><SearchRoundedIcon className='cursor-pointer '></SearchRoundedIcon></IconButton>
                <input value={search} onChange={(e)=>{setSearch(e.target.value)}} className='flex-1 outline-none h-full ' type="text" />
                <IconButton className={(search? " scale-100 ":" scale-0 ")}><CancelSharpIcon onClick={()=>{setSearch("")}} className= 'cursor-pointer ease-in-out duration-300'></CancelSharpIcon></IconButton>
                
                
            </form>
            {
                search? "hello in search " :
                (
                    listOfCat.map((cat, key) => {
                        return (
                            <SingleCatSlider key={key} cat={cat[0]} link={cat[1]} cat_id={cat[2]}/>
                            )
                        })
                )
            }

        </div>

    )
}

export default AllCat