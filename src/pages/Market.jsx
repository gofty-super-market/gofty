import React from 'react'
import { useParams } from 'react-router-dom'
import AllCat from '../components/AllCat';
import CatBar from '../components/CatBar'
import SpcCat from '../components/SpcCat';

function Market() {
  const {cat} = useParams();
  return (
    <div className='mt-16 md:mt-20'>
    <CatBar/>
    {
      !cat? (<AllCat/>):(<SpcCat/>)
      
    }
    </div>
  )
}

export default Market