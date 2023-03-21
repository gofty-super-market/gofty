import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";

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
    {},
    {},
  ]);

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
      <h1  className="text-3xl my-6">Favorites</h1>
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
