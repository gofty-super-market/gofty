import React, { useContext } from 'react'
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

import axios from "axios";
import { useEffect } from 'react';
import SingleCatSlider from './SingleCatSlider';
import {motion} from "framer-motion"
import { CatsContext } from '../context/cats';

const api = axios.create({
    baseURL: "https://ayshadashboard.com/api"
})



function AllCat() {
    const [catsProducts,setCatsProducts]=useState([]);
    const { cats, setCats } = useContext(CatsContext);
    const [search , setSearch ]= useState()

  const [searchRes, setSearchRes] = useState([]);

  const HiFormData = new FormData();
  useEffect(() => {
    HisFormData.append("nbr_orders", 2 );
    api({
      method: "post",
      url: "orders-3",
      data: HisFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      setHistory(res.data);
      console.log(res.data);
      console.log(userId)
    });
  }, [userId]);

    return (
        <motion.div 
        initial={{y:200}} animate={{y:0}}
        className='w-full max-w-[1200px] mx-auto px-5 '>
            <h1 className='text-gray-700 mt-5 md:mt-10 mb-5 text-3xl font-medium flex items-center gap-2'><StorefrontRoundedIcon /> Our Market</h1>
            <form className='overflow-hidden my-5 md:my-10 border rounded-full  max-w-xs w-full h-11 flex items-center gap-2 px-1 text-gray-600 drop-shadow-md bg-white'>
                <IconButton><SearchRoundedIcon className='cursor-pointer '></SearchRoundedIcon></IconButton>
                <input value={search} onChange={(e)=>{setSearch(e.target.value)}} className='flex-1 outline-none h-full ' type="text" />
                <IconButton className={(search? " scale-100 ":" scale-0 ")}><CancelSharpIcon onClick={()=>{setSearch("")}} className= 'cursor-pointer ease-in-out duration-300'></CancelSharpIcon></IconButton>
                
                
            </form>
            {
                search? 
                    <div>

                    </div>
                :
                (
                    cats.map((cat, key) => {
                        return (
                            <SingleCatSlider key={key} cat={cat.name} link={("/market/"+cat.name)} cat_id={cat.id_category}/>
                            )
                        })
                )
            }

        </motion.div>

    )
}

export default AllCat