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

import Stack from "@mui/material/Stack";

import MuiCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useInView } from "react-intersection-observer";

import { motion, useAnimation } from "framer-motion";
import { UserId } from "../context/userId";

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

  const getProduct = !cart?.length==0
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
  return (
    <MuiCard sx={{ padding: 1, maxWidth: 360, marginY: 2, borderRadius: 6 }}>
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
            ? "flex justify-between items-center px-2"
            : "flex justify-end px-2"
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
          onClick={addtocartHandler}
          size="small"
          className="bg-prime button p-1 px-2 text-white"
        >
          <AddIcon />
        </button>
      </div>
    </MuiCard>
  );
}

export default Card;
