import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import EastRoundedIcon from "@mui/icons-material/EastRounded";
import Card from "./Card";
import { CatsContext } from "../context/cats";
import { FavContext } from "../context/FavContext";

const api = axios.create({
  baseURL: "https://ayshadashboard.com/api",
});

export default function SingleCatSlider({ cat, link, cat_id }) {
  const [products, setProducts] = useState([{},{},{}]);
  const [totalProducts , setTotalProducts] = useState(0);
  const { cats , setCats } = useContext(CatsContext)
  const { favs , setFavs } = useContext(FavContext)
  useEffect(() => {
    var total = cats.filter((cat) => cat.id_category === cat_id);
    try{
    if(total!=[]){
    setTotalProducts(total[0].nbr_products);
    }
    }catch(err){
    }
  },[cat_id])
  useEffect(() => {
    if (cat_id == "random") {
      let cartFormData = new FormData();
      cartFormData.append("nbr_products", 20);
      api({
        method: "post",
        url: "products-random",
        data: cartFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => setProducts(res.data));
    } else if(cat_id=="products-new"){
      api.get("/products-new").then((res) => setProducts(res.data));
    }else if(cat_id=="favorite"){
      setProducts(favs)
    }else {
      api.get("/products-" + cat_id).then((res) => setProducts(res.data));
    }
  }, [cat_id]);

  return (
    products.length != 0 && (
      <motion.div>
        {link == null ? (
          <h3 className="w-fit text-gray-700  text-2xl font-medium">
            {cat}
          </h3>
        ) : (
          <h3 className="w-fit text-gray-700  text-2xl font-medium">
            <Link
              className="w-fit cat-link-h3 hover:pl-3 ease-in-out duration-300 border-b-2 py-1 flex items-center justify-between gap-3"
              to={cat}
            >
              {cat}{" "}{<span className="p-1 text-white px-3 text-sm bg-prime rounded-full">{totalProducts}</span>}{" "}
              <EastRoundedIcon className="opacity-0 ease-in-out duration-300" />{" "}
            </Link>
          </h3>
        )}
        <div className="mx-auto w-full max-w-[1200px]">
          <Splide
            className="py-6"
            options={{
              perPage: 5,
              arrows: false,
              gap: 2,
              breakpoints: {
                640: {
                  perPage: 2,
                },
                850: {
                  perPage: 3,
                },
                1200: {
                  perPage: 4,
                },
              },
            }}
          >
            {products.map((product, key) => {
              return (
                <SplideSlide key={key} className="px-2">
                  <Card
                    img={product.image}
                    unite={product.unite}
                    title={product.title}
                    price={product.price}
                    productId={product.id_product}
                  />
                </SplideSlide>
              );
            })}
          </Splide>
        </div>
      </motion.div>
    )
  );
}
