import React, { useEffect, useState } from 'react'
import { Outlet, NavLink, Routes, useParams } from "react-router-dom";
import axios from "axios"

                        // const listOfCat = [
                        //     [undefined,"/market/"],
                        //     ["Fruits","/market/Fruits"],
                        //     ["Légumes","/market/Légumes"],
                        //     ["Crémerie","/market/Crémerie"],
                        //     ["Épicerie","/market/Épicerie"],
                        //     ["Boissons","/market/Boissons"],
                        //     ["Hygiène","/market/Hygiène"],
                        //     ["Pâtisserie","/market/Pâtisserie"],
                        //     ["Food","/market/Food"],
                        //     ["Electro","/market/Electro"]
                        // ]

const api = axios.create({
    baseURL: "https://goftysupermarketelectronic.com/api"
})

function CatBar() {
    const [listOfCat , setListOfCat]=useState([])
    useEffect(() => {
        api.get("/categories").then(res =>{ setListOfCat(res.data)})
    }, [])
    const { cat } = useParams()
  return (
    <div className='backdrop-blur-xl sticky top-12 md:top-16 z-50 px-5 md:px-10 catbarscrall flex overflow-x-scroll md:justify-center w-full max-w-[1200px] h-14 bg-[#eeea] border md:rounded-md mx-auto '>
        <ul className='flex text-md text-gray-500 select-none'>
        <li><NavLink 
        className={((({ isActive }) => isActive? "cat act-cat":"cat"))}
         to={"/market/"}>All</NavLink></li>
        {   
            listOfCat.map((cati,key)=>{
                return(
                    <li key={key} ><NavLink className={(({ isActive }) => isActive? "cat act-cat":"cat")} to={"/market/"+cati.name}>{cati.name}</NavLink></li>
                )
            })
        }
        </ul>
    </div>
  )
}

export default CatBar