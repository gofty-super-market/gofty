import React, { useState, useEffect } from 'react'
import WhatshotIcon from '@mui/icons-material/Whatshot';

import Card from './Card';
import Img1 from "../imgs/productsImgs/1.jpg";
import axios from 'axios';

import { useInView } from 'react-intersection-observer';
import { motion,useAnimation } from 'framer-motion';

const api = axios.create({
  baseURL: "https://marrakech-quad-biking.com/demo/gofty/api"
})



function BestSeller() {
  const [NewProducts, setNewProducts] = useState([])

  const { ref, inView } = useInView({
    threshold: 0.2
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
  useEffect(() => {
    api.get("products-new").then(res => {
      setNewProducts(res.data)
    })

  }, [])

  return (
    <motion.div transition={{duration:.6}}  ref={ref} animate={animation}>
      <h1 className='mx-auto max-w-[1100px] uppercase text-2xl font-medium text-gray-700 ml-5'><WhatshotIcon />Now Products</h1>
      <div className='mx-auto max-w-[1100px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-0 gap-4 md:gap-8 h-fit p-3 md:p-2'>


        {
          NewProducts.map((product, key) => {
            if (key < 4) {
              return (
                <Card productId={product.id_product} key={product.id_product} img={Img1} title={product.title} price={product.price} />
              )
            }
          })
        }

      </div>
    </motion.div>
  )
}

export default BestSeller