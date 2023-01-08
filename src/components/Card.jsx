import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { Alert, CircularProgress } from '@mui/material';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { useContext } from 'react';
import { CartContext } from '../context/cartContext';

import Img from "../../src/imgs/productsImgs/1.jpg";

function Card({ img, title, price, description, productId }) {
    const [added, setAdded] = useState(false);
    const { cart, setCart } = useContext(CartContext);
    const addtocart = () => {
        let newCart = cart;
        let alreadyAdded = false;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].productId == productId) {
                newCart[i].q += 1;
                setCart(newCart);
                alreadyAdded = true;
            }
        }
        if (!alreadyAdded) {
            setCart(a =>
                [ {
                    productId, description, price, title, img:Img, q: 1 , miniInfo : "lorem epson"
                },...a]
            );
        }
    }
    return (
        <div className='mx-auto card flex flex-col'>

            <Link to={"/market/product/" + productId}>
                <div className='flex-1 flex items-center justify-center overflow-hidden'>
                    <img className='h-[150px] md:h-[200px] object-cover' src={img} alt="" />
                </div>
            </Link>
            <div className='flex-1 p-3 sm:p-4 flex flex-col'>
                <Link to={"/market/product/" + productId}>
                    <h3 className='text-xs md:text-base font-medium text-gray-700'>{title}</h3>
                    <p className='text-xs md:text-xs text-gray-600 flex-1'>{description ? description : "no description"}</p>
                </Link>
                <div className='flex items-end justify-between mt-1 '>
                    <h2 className='text-base md:text-xl font-medium text-gray-700 w-full'>{price} DH</h2>
                    {/* <Tooltip title="add to cart" arrow > */}
                    <button onClick={() => addtocart()} className='button p-1 md:p-2 cardBtn drop-shadow-md hover:bg-[#85a864] bg-[#95BF6D] text-white rounded-xl'>
                        {
                            added ? <DoneRoundedIcon /> : <AddIcon />
                        }
                    </button>
                    {/* </Tooltip> */}
                </div>
            </div>
        </div>
    )
}

export default Card