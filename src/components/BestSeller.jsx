import React, { useState, useEffect } from 'react'
import WhatshotIcon from '@mui/icons-material/Whatshot';

import Card from './Card';
import Img1 from "../imgs/productsImgs/1.jpg";
import axios from 'axios';

import { useInView } from 'react-intersection-observer';
import { motion,useAnimation } from 'framer-motion';
import SingleCatSlider from './SingleCatSlider';

const api = axios.create({
  baseURL: "https://goftysupermarketelectronic.com/api"
})



function BestSeller() {

  const { ref, inView } = useInView({
        threshold:window.innerWidth>500? 0.2 : 0 ,
  });
  const animation = useAnimation()
  useEffect(() => {
    if (inView) {
      animation.start({
        x: 0,
        opacity: 1
      })
    } else {
      animation.start({
        x: -300,
        opacity: 0,
      })
    }
  }, [inView])
  return (
    <motion.div transition={{duration:.6}}  ref={ref} animate={animation}>

                <SingleCatSlider cat={"New Products "} link={null} cat_id={"products-new"}/>
                <SingleCatSlider cat={"You may like"} link={null} cat_id={"random"}/>
    </motion.div>
  )
}

export default BestSeller