import { useEffect, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";

import Navbar from "./components/navbar";
import { CartContext } from "./context/cartContext";
import { EditContext } from "./context/edit";
import Pages from "./pages/pages";



import axios from "axios"
import ScrollToTop from "./components/ScrollToTop";
import { AddToCart } from "./context/addToCart";


const api = axios.create({
  baseURL: "https://goftysupermarketelectronic.com/api"
})

function App() {

  useEffect(() => {
    api.get("/product-1").then(res => {
    })
  }, [])

  const [cart, setCart] = useState([]);
  const [edit, setEdit] = useState(0);
  const [addToCart, setAddToCart] = useState(0);

  return (
    <BrowserRouter>
      <div>
        <CartContext.Provider value={{ cart, setCart }}>
        <EditContext.Provider value={{ edit, setEdit }}>
        <AddToCart.Provider value={{ addToCart, setAddToCart }}>
          <ScrollToTop />
          <Pages cart={cart} setCart={setCart}/>
        </AddToCart.Provider>
        </EditContext.Provider>
        </CartContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
