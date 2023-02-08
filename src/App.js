import { useEffect, useState } from "react";
import { BrowserRouter , useLocation } from "react-router-dom";
// hello

import Navbar from "./components/navbar";
import { CartContext } from "./context/cartContext";
import { EditContext } from "./context/edit";
import { UpdateCart } from "./context/updateCart";
import { AddToCart } from "./context/addToCart";
import { UserId } from "./context/userId";


import Pages from "./pages/pages";

import axios from "axios"
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/loading";


const api = axios.create({
  baseURL: "https://goftysupermarketelectronic.com/api"
})



function App() {
  const [cart, setCart] = useState([]);
  const [edit, setEdit] = useState(0);
  const [userId, setUserId] = useState(null);
  const [updateCart, setUpdateCart] = useState(0);
  const [loading, setLoading] =useState(true)
  const [addToCart, setAddToCart] = useState(0);

  const cartFormData = new FormData();
  cartFormData.append('id_client', userId)
  useEffect(()=>{
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  },[])
  useEffect(()=>{
    setUpdateCart(p=>p+1)
  },[userId])
  useEffect(()=>{
    let ul = localStorage.getItem("GoftyUserId") == "null" ? null :localStorage.getItem("GoftyUserId") 
    if(ul!=null){
      setUserId(ul)
      setUpdateCart(p=>p+1)
    }
  },[])
  useEffect(() => {
    api({
      method: "post",
      url: "cart",
      data: cartFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        if(Array.isArray(response.data)){
        setCart(response.data)
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }, [updateCart])


  return (
    <BrowserRouter>
      <div>
        <CartContext.Provider value={{ cart, setCart }}>
          <EditContext.Provider value={{ edit, setEdit }}>
            <AddToCart.Provider value={{ addToCart, setAddToCart }}>
              <UpdateCart.Provider value={{ updateCart, setUpdateCart }}>
              <UserId.Provider value={{ userId, setUserId }}>
                <ScrollToTop />
                {
                loading?
                <Loading/>:
                <Pages cart={cart} setCart={setCart} />
                }
              </UserId.Provider >
              </UpdateCart.Provider >
            </AddToCart.Provider>
          </EditContext.Provider>
        </CartContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
