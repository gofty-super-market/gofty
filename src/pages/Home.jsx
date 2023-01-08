import React from 'react'
import BestSeller from '../components/BestSeller'
import Categories from '../components/Categories'
import GoftyOffer from '../components/GoftyOffer'
import Hero from '../components/Hero'

function Home() {
  return (
    <div className='flex justify-center'>
        <div className='w-full  max-w-7xl'>
           <Hero/>
           <Categories/>
           <GoftyOffer/>
           <BestSeller/>
        </div>
    </div>
  )
}

export default Home