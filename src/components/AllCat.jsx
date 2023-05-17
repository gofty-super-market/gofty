import React, { useContext } from "react";
import Card from "./Card";
import GoftyOffer from "./GoftyOffer";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link, useParams } from "react-router-dom";

import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import { IconButton } from "@mui/material";
import { useState } from "react";

import axios from "axios";
import { useEffect } from "react";
import SingleCatSlider from "./SingleCatSlider";
import { motion } from "framer-motion";
import { CatsContext } from "../context/cats";

const api = axios.create({
  baseURL: "https://ayshadashboard.com/api",
});

function AllCat() {
  const [catsProducts, setCatsProducts] = useState([]);
  const { cats, setCats } = useContext(CatsContext);
  const [search, setSearch] = useState();

  const [searchRes, setSearchRes] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const searchFormData = new FormData();
  useEffect(() => {
    setSearchRes([]);
    if (search && search != " " && search != "0") {
      setLoadingSearch(true);
      searchFormData.append("phrase", search);
      api({
        method: "post",
        url: "products-search",
        data: searchFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        console.log(res.data);
        setSearchRes(res.data);
        setLoadingSearch(false);
      });
    } else {
      setSearchRes([]);
    }
  }, [search]);
  useEffect(()=>{if(search==""){setSearchRes([])}},[search,loadingSearch])
  return (
    <motion.div
      initial={{ y: 200 }}
      animate={{ y: 0 }}
      className="w-full max-w-[1200px] mx-auto px-5 "
    >
      <h1 className="text-gray-700 mt-5 md:mt-10 mb-5 text-3xl font-medium flex items-center gap-2">
        <StorefrontRoundedIcon /> Our Market
      </h1>
      <form className="overflow-hidden my-5 md:my-10 border rounded-full  max-w-xs w-full h-11 flex items-center gap-2 px-1 text-gray-600 drop-shadow-md bg-white">
        <IconButton>
          <SearchRoundedIcon className="cursor-pointer "></SearchRoundedIcon>
        </IconButton>
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="flex-1 outline-none h-full "
          type="text"
        />
        <IconButton className={search ? " scale-100 " : " scale-0 "}>
          <CancelSharpIcon
            onClick={() => {
              setSearch("");
            }}
            className="cursor-pointer ease-in-out duration-300"
          ></CancelSharpIcon>
        </IconButton>
      </form>

            {
                search&&
      <div className=" rounded-2xl  mb-4">
        
        {search&&(loadingSearch ? (
          <h3 className="text-2xl text-gray-600 py-8">Searching...</h3>
        ) : (
          <h3 className="text-2xl text-gray-600 py-4">
            {(searchRes?.length > 0 )
              ? (searchRes?.length ) + " result"
              : " no results"}
          </h3>
        ))}
        <div className=" mx-auto  w-full max-w-[1200px] grid grid-cols-2 gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {searchRes.map((product, key) => {
            return (
              <Card
                key={key}
                unite={product.unite}
                productId={product.id_product}
                img={product.image}
                title={product.title}
                description={product.description}
                price={product.price}
              />
            );
          })}
        </div>
        <br/>
      </div>
            }
      {cats.map((cat, key) => {
        return (
          <SingleCatSlider
            key={key}
            cat={cat.name}
            link={"/market/" + cat.name}
            cat_id={cat.id_category}
          />
        );
      })}
    </motion.div>
  );
}

export default AllCat;
