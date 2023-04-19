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
import { LangContext } from "./context/langContext";
import { CurrentLang } from "./context/CurrentLang";


const api = axios.create({
  baseURL: "https://ayshadashboard.com/api",
});

const simpleLangFr = {
  heroWelcome: "gofty supermarché électronique",
  secHeroWelcome:"Sur la place de “super healthy” on mettre “Tout est proche de vous”",
  home: "accueil",
  market: "marché" ,
  contact: "contact" ,
  startShopping:"aller au marché",
};
const simpleLangEn = {
  heroWelcome: "gofty supermarket electronic",
  secHeroWelcome:"On the place of “super healthy” we put “Everything is close to you” ",
  home: "home",
  market: "market" ,
  contact: "contact" ,
  startShopping:"Shop now",
};

function App() {
  const [cart, setCart] = useState([]);
  const [cats, setCats] = useState([]);
  const [edit, setEdit] = useState(0);
  const [userId, setUserId] = useState(null);
  const [updateCart, setUpdateCart] = useState(0);
  const [loading, setLoading] = useState(true);
  const [addToCart, setAddToCart] = useState(0);
  const { logedin, setLogedin } = useContext(LogedinContext);
  const [langs, setLangs] = useState({});
  const [currentLang, setCurrentLang] = useState("En");

  const [favs, setFavs] = useState([]);


  const langFormData = new FormData();
  useEffect(()=>{
    langFormData.append("lang", currentLang);
    api({
      method: "post",
      url: "language",
      data: langFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      setLangs(res.data)
    });
  },[currentLang])

  useEffect(()=>{
    if(currentLang=="Fr"){
      setLangs(simpleLangFr)
    }
    if(currentLang=="En"){
      setLangs(simpleLangEn)
    }
  },[currentLang])


  const FavFormData = new FormData();
  useEffect(() => {
    FavFormData.append("id_client", userId);
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
    FavFormData.append("id_client", userId);
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
                      <LangContext.Provider value={{ langs, setLangs }}>
                        <CurrentLang.Provider value={{ currentLang, setCurrentLang }}>

                        <ScrollToTop />
                        {loading ? (
                          <Loading />
                          ) : (
                          <Pages cart={cart} setCart={setCart} />
                          )}
                          </CurrentLang.Provider>
                      </LangContext.Provider>
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
