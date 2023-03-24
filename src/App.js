import { useContext, useEffect, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
// hello

import { EditContext } from "./context/edit";
import { UpdateCart } from "./context/updateCart";
import { AddToCart } from "./context/addToCart";
import { UserId } from "./context/userId";

import Pages from "./pages/pages";

import axios from "axios";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/loading";
import { CatsContext } from "./context/cats";
import { LogedinContext, LogedinProvider } from "./context/Logedin";
import { CartContext } from "./context/cartContext";
import { FavContext } from "./context/FavContext";

const api = axios.create({
  baseURL: "https://ayshadashboard.com/api",
});

function App() {
  const [cart, setCart] = useState([]);
  const [cats, setCats] = useState([]);
  const [edit, setEdit] = useState(0);
  const [userId, setUserId] = useState(null);
  const [updateCart, setUpdateCart] = useState(0);
  const [loading, setLoading] = useState(true);
  const [addToCart, setAddToCart] = useState(0);
  const { logedin, setLogedin } = useContext(LogedinContext);

  const [favs, setFavs] = useState([]);

  const FavFormData = new FormData();
  useEffect(() => {
    FavFormData.append("id_client", userId );
    api({
      method: "post",
      url: "favorites",
      data: FavFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      setFavs(res.data);
    });
  }, [userId]);
  useEffect(() => {
    FavFormData.append("id_client", userId );
    api({
      method: "post",
      url: "favorites",
      data: FavFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      setFavs(res.data);
    });
  }, [updateCart]);

  useEffect(() => {
    api.get("/categories").then((res) => {
      setCats(res.data.reverse());
    });
  }, []);
  const cartFormData = new FormData();
  cartFormData.append("id_client", userId);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  useEffect(() => {
    setUpdateCart((p) => p + 1);
  }, [userId]);
  useEffect(() => {
    let ul =
      localStorage.getItem("GoftyUserId") == "null"
        ? null
        : localStorage.getItem("GoftyUserId");
    if (ul != null) {
      setUserId(ul);
      setUpdateCart((p) => p + 1);
    }
  }, []);
  useEffect(() => {
    let ll =
      localStorage.getItem("Loged") == "false"
        ? null
        : localStorage.getItem("Loged");
    if (ll != null) {
      setLogedin(true);
      setUpdateCart((p) => p + 1);
    }
  }, []);
  useEffect(() => {
    api({
      method: "post",
      url: "cart",
      data: cartFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        if (Array.isArray(response.data)) {
          setCart(response.data);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }, [updateCart]);

  return (
    <BrowserRouter>
      <div>
        <FavContext.Provider value={{ favs, setFavs }}>
          <CartContext.Provider value={{ cart, setCart }}>
            <EditContext.Provider value={{ edit, setEdit }}>
              <AddToCart.Provider value={{ addToCart, setAddToCart }}>
                <UpdateCart.Provider value={{ updateCart, setUpdateCart }}>
                  <UserId.Provider value={{ userId, setUserId }}>
                    <CatsContext.Provider value={{ cats, setCats }}>
                      <ScrollToTop />
                      {loading ? (
                        <Loading />
                      ) : (
                        <Pages cart={cart} setCart={setCart} />
                      )}
                    </CatsContext.Provider>
                  </UserId.Provider>
                </UpdateCart.Provider>
              </AddToCart.Provider>
            </EditContext.Provider>
          </CartContext.Provider>
        </FavContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
