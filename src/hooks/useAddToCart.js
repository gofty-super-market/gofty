import axios from "axios";
import { useContext } from "react";
import { AddToCart } from "../context/addToCart";
import { CartContext } from "../context/cartContext";
import { UpdateCart } from "../context/updateCart";
import { UserId } from "../context/userId";

const api = axios.create({
  baseURL: "https://ayshadashboard.com/api",
});

const useAddToCart = (productId, q)=> {

  const { updateCart, setUpdateCart } = useContext(UpdateCart);
  const { userId, setUserId } = useContext(UserId);
  const { cart, setCart } = useContext(CartContext);
  const { addtocart, setAddToCart } = useContext(AddToCart);

  const getProduct =
    !cart?.length == 0
      ? cart.filter((item) => {
          return item.product.id_product == productId;
        })
      : false;


  const isAdded = () => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product.id_product == productId) {
        return true;
      }
    }
    return false;
  };

  if (isAdded()) {
    var cartFormData = new FormData();
    cartFormData.append("id_client", userId);
    cartFormData.append("id_product", productId);
    cartFormData.append("quantity", Number(getProduct[0].quantity) + q);
    cartFormData.append("unite", getProduct[0].unite);
    api({
      method: "post",
      url: "cart-update",
      data: cartFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        setUpdateCart((p) => p + 1);
        setAddToCart((pre) => pre + 1);
      })
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
      })
  }
}


export default useAddToCart;