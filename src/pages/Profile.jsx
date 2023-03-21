import { Avatar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { LogedinContext } from "../context/Logedin";
import axios from "axios";
import { UserId } from "../context/userId";
import {
  ArrowRight,
  ArrowRightAlt,
  ArrowRightSharp,
  OpenInBrowser,
  OpenInFull,
} from "@mui/icons-material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import SingleCatSlider from "../components/SingleCatSlider";
import OrdersHistory from "../components/OrdersHistory";

const api = axios.create({
  baseURL: "https://ayshadashboard.com/api",
});
function Profile() {
  const [userInfo, setUserInfo] = useState({ fname: " ", lname: " " });

  const { userId, setUserId } = useContext(UserId);
  const { logedin, setLogedin } = useContext(LogedinContext);

  useEffect(() => {
    if (userId != null && logedin) {
      api.get("/client-" + userId).then((res) => {
        setUserInfo(res.data);
      });
    }
  }, [logedin]);
  return (
    <div className="mx-auto max-w-[1100px] w-full mt-16 sm:mt-28 px-4 text-gray-700 items-center">
      <div className="w-full flex flex-col sm:flex-row gap-4  md:gap-8 h-fit bg-white p-5 rounded-xl drop-shadow-xl max-w-[600px]">
        <div className="flex gap-4 flex-1">

        <Avatar
          sx={{
            height: "100px",
            width: "100px",
            fontSize: "40px",
            backgroundColor: "#759c53",
          }}
          >
            {userInfo?.fname + " " + userInfo?.lname == " "
            ? userInfo?.fname[0].toUpperCase() + userInfo?.lname[0].toUpperCase()
            : null}
        </Avatar>
        <div className=" flex flex-col items-start flex-1">
          <h2 className="text-xl">
            {userInfo?.fname + " " + userInfo?.lname == " "
              ? userInfo?.fname + " " + userInfo?.lname
              : "user name"}
          </h2>
          <h3 className="text-sm">{userInfo?.email || "user email"}</h3>
          <h3 className="text-sm">
            {userInfo?.phone|| "phone number"}
          </h3>
          <h3 className="text-sm">
            {userInfo?.address|| "address"}
          </h3>
        </div>
              </div>

          <button className="h-fit w-fit hidden md:flex button bg-gray-800 px-4 text-white gap-2 my-2">
            <LogoutIcon />
            Sign out{" "}
          </button>
      </div>

      <div className="my-10">
        <div className="flex">
          <h1 className="text-3xl py-4 flex-1">Favorate</h1>
          <Link to={"/favorite"}>
          <button className="flex-1 h-fit md:flex-none button bg-prime ease-in-out duration-200 text-white flex items-center justify-center gap-2 hover:gap-3 hover:opacity-90">
            See all <ArrowForwardIcon />{" "}
          </button>
          </Link>
        </div>
          <SingleCatSlider cat={""} link={null} cat_id={"random"}/>
      </div>
      <div>
        <div className="flex">
          <h1 className="text-3xl py-4 flex-1">History</h1>
          <Link to={"/history"}>
          <button className="flex-1 h-fit md:flex-none button bg-prime ease-in-out duration-200 text-white flex items-center justify-center gap-2 hover:gap-3 hover:opacity-90">
            See all <ArrowForwardIcon />{" "}
          </button>
          </Link>
        </div>
        <OrdersHistory/>          
      </div>
    </div>
  );
}

export default Profile;
