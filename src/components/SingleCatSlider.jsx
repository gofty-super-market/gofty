import axios from "axios";
import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import EastRoundedIcon from "@mui/icons-material/EastRounded";
import Card from "./Card";

const api = axios.create({
  baseURL: "https://goftysupermarketelectronic.com/api",
});

export default function SingleCatSlider({ cat, link, cat_id }) {
  const [products, setProducts] = useState([]);
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
    } else {
      api.get("/products-" + cat_id).then((res) => setProducts(res.data));
    }
  }, [cat_id]);

  return (
    products.length != 0 && (
      <motion.div>
        {link == null ? (
          <h3 className="w-fit text-gray-700  text-2xl font-medium">
            {cat}{" "}
            <EastRoundedIcon className="opacity-0 ease-in-out duration-300" />
          </h3>
        ) : (
          <h3 className="w-fit text-gray-700  text-2xl font-medium">
            <Link
              className="w-fit cat-link-h3 hover:pl-3 ease-in-out duration-300 border-b-2 py-1"
              to={cat}
            >
              {cat}{" "}
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
