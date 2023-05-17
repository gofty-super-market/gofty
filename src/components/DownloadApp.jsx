import React, { useEffect } from 'react'
import app from "../imgs/app.png"
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import { useInView } from 'react-intersection-observer';
import { useAnimation ,motion } from 'framer-motion';

function DownloadApp() {

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
    <motion.div transition={{duration:.6}}  ref={ref} animate={animation}  className='bg-white rounded-xl border drop-shadow-lg p-5 mt-6 m-4 md:mx-auto max-w-[900px] flex flex-col items-center md:flex-row gap-4'>
        <img src={app}></img>
        <div>
        <h3 className='text-2xl font-semibold text-gray-700 md:text-4xl py-3'>
            Download our app for android and ois
        </h3>
        <p className='text-md text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum modi inventore culpa voluptate harum distinctio architecto four app for android and ois
        </p>
        <div className='flex gap-3 pt-3 flex-col md:flex-row '>
            <button className='flex px-4 py-2 bg-gray-800 rounded-lg text-white items-center  gap-2'>
                <AppleIcon sx={{fontSize:38}}/>
                <div className='flex flex-col items-start'>
                    <p className='text-xs'>Download From</p>
                    <p>Apple App Store</p>
                </div>
            </button>
            <button className='flex px-4 py-2 bg-gray-800 rounded-lg text-white items-center  gap-2'>
                <AndroidIcon sx={{fontSize:38}}/>
                <div className='flex flex-col items-start'>
                    <p className='text-xs'>Download From</p>
                    <p>Google Play Store</p>
                </div>
            </button>
        </div>
        </div>
    </motion.div>
  )
}

export default DownloadApp