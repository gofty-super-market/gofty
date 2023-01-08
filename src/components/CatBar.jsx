import React from 'react'
import { Outlet, NavLink, Routes, useParams } from "react-router-dom";



                        const listOfCat = [
                            [undefined,"/market/"],
                            ["Fruits","/market/Fruits"],
                            ["Légumes","/market/Légumes"],
                            ["Crémerie","/market/Crémerie"],
                            ["Épicerie","/market/Épicerie"],
                            ["Boissons","/market/Boissons"],
                            ["Hygiène","/market/Hygiène"],
                            ["Pâtisserie","/market/Pâtisserie"],
                            ["Food","/market/Food"],
                            ["Electro","/market/Electro"],
                        ]




function CatBar() {
    const { cat } = useParams()
  return (
    <div className='backdrop-blur-xl sticky top-12 md:top-16 z-50 px-5 md:px-10 catbarscrall flex overflow-x-scroll md:justify-center w-full max-w-[1200px] h-14 bg-[#eeea] border md:rounded-md mx-auto '>
        <ul className='flex text-md text-gray-500 select-none'>

        {   
            listOfCat.map((cati,key)=>{
                return(
                    <li key={key} ><NavLink className={(((cati[0]==cat) ? "cat act-cat":"cat"))} to={cati[1]}>{(!cati[0])? "All" : cati[0]}</NavLink></li>
                )
            })
        }
        </ul>
    </div>
  )
}

export default CatBar