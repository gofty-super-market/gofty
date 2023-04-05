import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import axios from "axios";
import { Alert, CircularProgress } from "@mui/material";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { UpdateCart } from "../context/updateCart";
import { EditContext } from "../context/edit";
import { AddToCart } from "../context/addToCart";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import Skeleton from "@mui/material/Skeleton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

import Stack from "@mui/material/Stack";

import MuiCard from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { useInView } from "react-intersection-observer";

import { motion, useAnimation } from "framer-motion";
import { UserId } from "../context/userId";
import { FavContext } from "../context/FavContext";
import { LogedinContext } from "../context/Logedin";
const api = axios.create({
  baseURL: "https://ayshadashboard.com/api",
});

function Card({ img, title, price, description, productId, unite }) {
  const [added, setAdded] = useState(false);
  const [skeliton, setSkeliton] = useState(true);
  const { updateCart, setUpdateCart } = useContext(UpdateCart);
  const { userId, setUserId } = useContext(UserId);
  const { cart, setCart } = useContext(CartContext);
  const { addtocart, setAddToCart } = useContext(AddToCart);
  const [loading, setLoading] = useState(false);
  const { logedin, setLogedin } = useContext(LogedinContext);



  const { ref, inView } = useInView({
    threshold: 0.3,
  });
  const animation = useAnimation();
  useEffect(() => {
    if (inView) {
      animation.start({
        y: 0,
        opacity: 1,
      });
    } else {
      animation.start({
        y: 200,
        opacity: 0,
      });
    }
  }, [inView]);

  useEffect(() => {
    setSkeliton(true);
    setTimeout(() => {
      setSkeliton(false);
    }, 800);
  }, [productId]);

  const isAdded = () => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product.id_product == productId) {
        return true;
      }
    }
    return false;
  };
  const addtocartHandler = () => {
    setLoading(true);
    if (userId) {
      if (isAdded()) {
        var cartFormData = new FormData();
        cartFormData.append("id_client", userId);
        cartFormData.append("id_product", productId);
        cartFormData.append("quantity", Number(getProduct[0].quantity) + 1);
        cartFormData.append("unite", "itme");
        api({
          method: "post",
          url: "cart-update",
          data: cartFormData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(() => {
            setUpdateCart((p) => p + 1);
            setAddToCart((pre) => pre + 1);
            setQ((pre) => pre + 1);
          })
          .then(() => {
            setLoading(false);
          });
      } else {
        var cartFormData = new FormData();
        cartFormData.append("id_client", userId);
        cartFormData.append("id_product", productId);
        cartFormData.append("quantity", 1);
        cartFormData.append("unite", "itme");
        api({
          method: "post",
          url: "cart-new",
          data: cartFormData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(() => {
            setUpdateCart((p) => p + 1);
            setAddToCart((pre) => pre + 1);
            setQ((pre) => pre + 1);
          })
          .then(() => {
            setLoading(false);
          });
      }
    } else {
      var cartFormData = new FormData();
      cartFormData.append("id_client", "0");
      cartFormData.append("id_product", productId);
      cartFormData.append("quantity", 1);
      cartFormData.append("unite", "itme");
      api({
        method: "post",
        url: "cart-new",
        data: cartFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          setUpdateCart((p) => p + 1);
          setAddToCart((pre) => pre + 1);
          setQ((pre) => pre + 1);
          setUserId(res.data);
          localStorage.setItem("GoftyUserId", res.data);
        })
        .then(() => {
          setLoading(false);
        });
    }
  };
  const [q, setQ] = useState(0);

  const getProduct =
    !cart?.length == 0
      ? cart.filter((item) => {
          return item.product.id_product == productId;
        })
      : false;

  useEffect(() => {
    if (getProduct?.length != 0) {
      setQ(Number(getProduct[0]?.quantity));
    } else {
      setQ(0);
    }
  }, [cart]);

  useEffect(() => {
    if (getProduct?.length != 0) {
      setQ(Number(getProduct[0]?.quantity));
    } else {
      setQ(0);
    }
  }, [productId]);

  const removefromcartHandler = () => {
    var cartFormData = new FormData();
    cartFormData.append("id_client", userId);
    cartFormData.append("id_product", productId);
    cartFormData.append("quantity", Number(getProduct[0].quantity) - 1);
    cartFormData.append("unite", "itme");
    api({
      method: "post",
      url: "cart-update",
      data: cartFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(() => {
      setAddToCart((pre) => pre + 1);
      if (q === 1) {
        var cartFormData = new FormData();
        cartFormData.append("id_cart", getProduct[0].id_cart);
        api({
          method: "post",
          url: "cart-delete",
          data: cartFormData,
          headers: { "Content-Type": "multipart/form-data" },
        }).then(() => {
          setUpdateCart((p) => p + 1);
          setQ(0);
        });
      } else {
        setQ((pre) => pre - 1);
        setUpdateCart((p) => p + 1);
      }
    });
  };

  const [favorite, setFavorite] = useState(false);
  const { favs, setFavs } = useContext(FavContext);

  useEffect(() => {
    const favF = favs.filter((fav) => fav.id_product == productId);
    if (favF.length > 0) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [favs]);

  useEffect(() => {
    const favF = favs.filter((fav) => fav.id_product == productId);
    if (favF.length > 0) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [productId]);

  const getIdFavorite = () => {
    const favF = favs.filter((fav) => fav.id_product == productId);
    if (favF.length > 0) {
      return favF[0].id_favorite;
    } else {
      return null;
    }
  };

  const handleFav = () => {
    if (!favorite) {
      const FavFormData = new FormData();
      FavFormData.append("id_client", userId);
      FavFormData.append("id_product", productId);
      api({
        method: "post",
        url: "favorite-add",
        data: FavFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        setFavorite(true);
      });
    } else {
      const FavFormData = new FormData();
      FavFormData.append("id_favorite", getIdFavorite());
      api({
        method: "post",
        url: "favorite-delete",
        data: FavFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        setFavorite(false);
      });
    }
    setUpdateCart((p) => p + 1);
  };

  return (
    <MuiCard
      sx={{
        padding: 1,
        maxWidth: 360,
        marginY: 2,
        borderRadius: 6,
        position: "relative",
      }}
    >
      <div className="flex justify-center">
        <Link to={"/market/product/" + productId}>
          <img
            className="h-[120px] md:h-[150px] object-contain"
            src={"https://ayshadashboard.com/" + img}
            alt=""
          />
        </Link>
      </div>
      <div className="p-2">
        <Link to={"/market/product/" + productId}>
          <Typography
            gutterBottom
            variant="body2"
            className="break-all"
            color="text.secondary"
          >
            {title?.substr(0, 19)}
          </Typography>
        </Link>
        <Typography variant="p" component="div">
          {price} DH
        </Typography>
      </div>
      <div
        className={
          q > 0
            ? "flex justify-between items-center "
            : "flex justify-end "
        }
      >
        {q > 0 && (
          <>
            <button
              onClick={removefromcartHandler}
              size="small"
              className="bg-red-400 button p-1 px-2 text-white"
            >
              <RemoveRoundedIcon />
            </button>
            <p className="text-center flex px-4 float-right">{q}</p>
          </>
        )}
        <button
          onClick={()=>{addtocartHandler()}}
          size="small"
          className="bg-prime button p-1 px-2 text-white"
        >
          <AddIcon />
        </button>
        {logedin && (
          <button
            onClick={handleFav}
            className="hover:bg-[#f1f1f1] button bg-white  drop-shadow-sm border text-[#F39221] p-2 absolute top-2 right-2"
          >
            {favorite ? <FavoriteRoundedIcon /> : <FavoriteBorderIcon />}{" "}
          </button>
        )}
      </div>
    </MuiCard>
  );
}

export default Card;
