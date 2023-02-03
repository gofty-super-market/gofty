import React from 'react'
// import { BrowserRouter, Switch, Routes, Route ,Redirect } from "react-router-dom";
import {  Route, Routes } from 'react-router-dom'
import Navbar from '../components/navbar'
import Home from './Home'
import Market from './Market';
import Contact from './Contact';
import Cart from './Cart';
import SingleProduct from '../components/SingleProduct';
import { Footer } from '../components/Footer';
import NotFoundPage from './NotFoundPage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import {motion } from "framer-motion"
import CartFlyBtn from '../components/CartFlyBtn';

function Pages({cart , setCart}) {
  return (
    <>

      <Navbar/>
      <CartFlyBtn/>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/market/' element={<Market/>} />
        <Route path='/market/:cat' element={<Market/>} />
        <Route path='/market/product/:id' element={<SingleProduct/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route cart={cart} setCart={setCart} path='/cart' element={<Cart/>} />
        <Route path="/signin" element={<SignInPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
      <Footer/>
    
    </>
  )
}

export default Pages