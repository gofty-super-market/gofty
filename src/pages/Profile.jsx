import { Avatar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { LogedinContext } from "../context/Logedin";
import HistoryIcon from '@mui/icons-material/History';
import axios from "axios";
import { UserId } from "../context/userId";
import {
  ArrowRight,
  ArrowRightAlt,
  ArrowRightSharp,
  Favorite,
  OpenInBrowser,
  OpenInFull,
} from "@mui/icons-material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SingleCatSlider from "../components/SingleCatSlider";
import OrdersHistory from "../components/OrdersHistory";

const api = axios.create({
  baseURL: "https://ayshadashboard.com/api",
});
function Profile() {
  const [userInfo, setUserInfo] = useState({ fname: " ", lname: " " });
  const navigate = useNavigate()
  const { userId, setUserId } = useContext(UserId);
  const { logedin, setLogedin } = useContext(LogedinContext);



  const [history, setHistory] = useState([]);

  const HisFormData = new FormData();
  useEffect(() => {
    HisFormData.append("nbr_orders", 2 );
    api({
      method: "post",
      url: "orders-111",
      data: HisFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      setHistory(res.data);
      console.log(res.data);
      console.log(userId)
    });
  }, [userId]);




  useEffect(()=>{
    if(logedin==!true && !userId){
      navigate("/signin") 
    }
  },[userId])

  useEffect(() => {
    if (userId != null && logedin) {
      api.get("/client-" + userId).then((res) => {
        setUserInfo(res.data);
      });
    }
  }, [logedin]);
  return (
    <div className="mx-auto max-w-[1100px] w-full mt-16 sm:mt-28 px-4 text-gray-700 items-center">
      <div className="w-full flex flex-col sm:flex-row gap-4  md:gap-8 h-fit bg-white p-5 rounded-xl drop-shadow-lg md:max-w-[600px]">
        <div className="flex gap-4 flex-1">

        <Avatar
          sx={{
            height: "80px",
            width: "80px",
            fontSize: "40px",
            backgroundColor: "#759c53",
          }}
          >
            {userInfo?.fname + " " + userInfo?.lname == " "
            ? userInfo?.fname[0].toUpperCase() + userInfo?.lname[0].toUpperCase()
            : null}
        </Avatar>
        <div className=" flex flex-col items-start flex-1">
          <h2 className="text-sm md:text-xl break-all">
            {userInfo?.fname + " " + userInfo?.lname == " "
              ? userInfo?.fname + " " + userInfo?.lname
              : "user name"}
          </h2>
          <h3 className="text-xs md:text-sm break-all">{userInfo?.email || "user email"}</h3>
          <h3 className="text-xs md:text-sm break-all">
            {userInfo?.phone|| "phone number"}
          </h3>
          <h3 className="text-xs md:text-sm break-all">
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
        <div className="flex items-center">
          <h1 className="text-2xl pt-2 flex-1 flex gap-2  items-center"><Favorite sx={{ fontSize: 30 }} />Favorate</h1>
          <Link to={"/favorite"}>
          <button className="flex-1 h-fit md:flex-none button bg-prime ease-in-out duration-200 text-white flex items-center justify-center gap-2 hover:gap-3 hover:opacity-90">
            <ArrowForwardIcon />{" "}
          </button>
          </Link>
        </div>
          <SingleCatSlider cat={""} link={null} cat_id={"favorite"}/>
      </div>
      <div>
        <div className="flex items-center">
          <h1 className="text-2xl py-4 flex-1 flex gap-2  items-center"><HistoryIcon sx={{ fontSize: 30 }} />Orders History</h1>
          <Link to={"/history"}>
          <button className="flex-1 h-fit md:flex-none button bg-prime ease-in-out duration-200 text-white flex items-center justify-center gap-2 hover:gap-3 hover:opacity-90">
            <ArrowForwardIcon />{" "}
          </button>
          </Link>
        </div>
        <OrdersHistory/>          
      </div>
    </div>
  );
}

export default Profile;
