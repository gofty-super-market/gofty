import { FavoriteBorder } from "@mui/icons-material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { LogedinContext } from "../context/Logedin";
import { UserId } from "../context/userId";

const api = axios.create({
  baseURL: "https://ayshadashboard.com/api",
});

function Favorite() {
  const [products, setProducts] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);


  const { userId, setUserId } = useContext(UserId);
  const { logedin, setLogedin } = useContext(LogedinContext);
  const navigate = useNavigate()
  useEffect(()=>{
    if(logedin==!true && !userId){
      navigate("/signin") 
    }
  },[userId])


  useEffect(() => {
    let cartFormData = new FormData();
    cartFormData.append("nbr_products", 20);
    api({
      method: "post",
      url: "products-random",
      data: cartFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="mx-auto max-w-[1100px] w-full mt-16 md:mt-28 px-4 text-gray-700 items-center">
        <h1 className="text-4xl py-4 flex-1 flex gap-4 items-center"> <FavoriteBorder sx={{ fontSize: 50 }}/> Favorites </h1>
      <div className="gap-3 w-full max-w-[1200px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => {
          return (
            <div className="drop-shadow-lg">
            <Card
              img={product?.image}
              unite={product?.unite}
              title={product?.title}
              price={product?.price}
              productId={product?.id_product}
            />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Favorite;
