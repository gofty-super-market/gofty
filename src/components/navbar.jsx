import React, { useState, useEffect } from "react";
import Logo from "../imgs/minilogo.png";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { CartContext } from "../context/cartContext";

import { EditContext } from "../context/edit";
import { UserId } from "../context/userId";
import { UpdateCart } from "../context/updateCart";
import axios from "axios";
import { LogedinContext } from "../context/Logedin";
import { AccountCircle, Favorite, History } from "@mui/icons-material";
import { LangContext } from "../context/langContext";
import { CurrentLang } from "../context/CurrentLang";

const api = axios.create({
  baseURL: "https://ayshadashboard.com/api",
});

function Navbar() {
  const [loged, setLoged] = useState(false);
  const { userId, setUserId } = useContext(UserId);
  const { updateCart, setUpdateCart } = useContext(UpdateCart);
  const { cart, setCart } = useContext(CartContext);
  const [showMenu, setShowMenu] = useState(false);
  const [userInfo, setUserInfo] = useState({ fname: " ", lname: " " });
  const { logedin, setLogedin } = useContext(LogedinContext);


  const {langs,setLangs}=useContext(LangContext);
  const {currentLang,setCurrentLang}=useContext(CurrentLang);
 
  const navigate = useNavigate();

  useEffect(() => {
    if (userId != null && logedin) {
      setLoged(false);
      api.get("/client-" + userId).then((res) => {
        setUserInfo(res.data);
      });
    }
  }, [logedin]);
  const { edit, setEdit } = useContext(EditContext);

  const handelMenuBtnsClick = () => {
    setShowMenu(!showMenu);
    scrolltop();
  };
  const [marketActive, setMarketActive] = useState(false);
  useEffect(() => {
    if (window.location.pathname.includes("/market")) {
      setMarketActive(true);
    } else {
      setMarketActive(false);
    }
  });

  const scrolltop = () => {
    window.scrollTo({ top: 0 });
  };
  const logout = () => {
    setUserId(null);
    setLoged(false);
    localStorage.setItem("GoftyUserId", null);
    setUpdateCart((p) => p + 1);
    setCart([]);
    localStorage.setItem("Loged", false);
    setLogedin(false);
    navigate("/");
  };
  return (
    <div className="border-b fixed w-full top-0 left-0 select-none flex bg-white justify-center items-center ztop">
      <div className=" px-6 md:px-16  h-[50px] md:h-16  w-full max-w-7xl flex gap-8 justify-between items-center">
        <div className="flex gap-3 items-center ">
          <NavLink
            onClick={() => setShowMenu(false)}
            className="flex gap-3 items-center"
            to={"/"}
          >
            <img className="w-6 h-6" src={Logo} alt="" />
            <span className="text-sm md:text-xl text-gray-600 font-medium -tracking-tight">
              GOFTY
            </span>
          </NavLink>
        </div>

        <ul className="hidden md:flex gap-2 text-gray-600 h-full">
          <li className="navlink">
            <NavLink
              onClick={() => {
                scrolltop();
              }}
              className={({ isActive }) =>
                isActive
                  ? " is-active-link linkToGoUp "
                  : " h-full flex items-center "
              }
              to="/"
            >
              {langs.HOME}
            </NavLink>
          </li>
          <li className="navlink">
            <NavLink
              onClick={() => {
                scrolltop();
              }}
              className={({ isActive }) =>
                isActive
                  ? " is-active-link linkToGoUp"
                  : " h-full flex items-center "
              }
              to="/market/"
            >
              {langs.MARKET}
            </NavLink>
          </li>
          <li className="navlink">
            <NavLink
              onClick={() => {
                scrolltop();
              }}
              className={({ isActive }) =>
                isActive
                  ? " is-active-link linkToGoUp"
                  : " h-full flex items-center "
              }
              to="/contact"
            >
              {langs.CONTACT}
            </NavLink>
          </li>
        </ul>
        {!logedin ? (


          <>

            
          <div className="flex gap-1 md:gap-3 flex-1 justify-end items-center">


            <div className="lang">
              <div
                className={
                  "relative  hover:border-[#95bf6d] hover:border-2 ease-in-out duration-300 cursor-pointer border-2 border-gray-300 text-gray-500 flex h-fit gap-2 items-center justify-center rounded-full py-1 px-[10px] bg-white drop-shadow-sm "
                }
              >
                <span className="">{currentLang}</span>

                <div className="absolute top left-[50%] translate-x-[-50%] top-[30px] pt-3 ">
                  <div className="langbtndiv hidden  gap-1 justify-center items-end text-gray-700 bg-white py-1 px-2 rounded-lg border drop-shadow-lg">
                    <button className="py-2 px-4 hover:bg-gray-100" onClick={()=>setCurrentLang("En")}>
                      English
                    </button>
                    <button className="py-2 hover:bg-gray-100 px-4" onClick={()=>setCurrentLang("Fr")}>
                      French
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Tooltip title="open cart" arrow>
              <NavLink to={"/cart"} onClick={() => setShowMenu(false)}>
                <div className="hover:border-[#95bf6d] hover:border-2 ease-in-out duration-300 cursor-pointer border-2 border-gray-300 text-gray-500 flex h-fit gap-2 items-center justify-center rounded-full py-1 px-[10px] bg-white drop-shadow-sm">
                  <LocalMallOutlinedIcon />
                  <div className="w-[2px] h-5 bg-gray-200 rounded-full"></div>
                  <span className="">{cart.length}</span>
                </div>
              </NavLink>
            </Tooltip>
            <NavLink to={"/signin"}>
              <button className="linkToGoUp hidden lg:block button hover:bg-[#f1f1f1] bg-[#fff] text-gray-600">
                Sign in
              </button>
            </NavLink>
            <NavLink to={"/signup"}>
              <button className=" linkToGoUp hidden md:block button hover:bg-[#8ab167] bg-[#95BF6D] text-white">
                Sign up
              </button>
            </NavLink>

            <div className="block md:hidden">
              <button
                className="text-gray-600"
                onClick={() => {
                  handelMenuBtnsClick();
                }}
              >
                {showMenu ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>

            <div
              className={
                showMenu
                  ? " bg-white w-full h-[calc(100vh-50px)] absolute left-0 top-[50px] p-10 flex flex-col justify-around ztop"
                  : " bg-white w-full h-[calc(100vh-50px)] absolute left-[-100%]  top-[50px] p-10 flex flex-col justify-around ztop"
              }
            >
              <ul className="flex flex-col gap-2 text-gray-600 items-center">
                <li
                  className="w-full flex justify-center"
                  onClick={() => setShowMenu(false)}
                >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "navlinkPhone active-phone " : " navlinkPhone "
                    }
                    to="/"
                  >
                    <HomeRoundedIcon /> {langs.HOME}
                  </NavLink>
                </li>
                <li
                  className="w-full flex justify-center"
                  onClick={() => setShowMenu(false)}
                >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "navlinkPhone active-phone " : " navlinkPhone "
                    }
                    to="/market/"
                  >
                    <StorefrontRoundedIcon /> {langs.MARKET}
                  </NavLink>
                </li>
                <li
                  className="w-full flex justify-center"
                  onClick={() => setShowMenu(false)}
                >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "navlinkPhone active-phone " : " navlinkPhone "
                    }
                    to="/contact"
                  >
                    <CallRoundedIcon />
                    {langs.CONTACT}
                  </NavLink>
                </li>
              </ul>
              <ul className="flex flex-col gap-2 text-gray-600 items-center">
                <li
                  className="w-full flex justify-center"
                  onClick={() => setShowMenu(false)}
                >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "navlinkPhone active-phone " : " navlinkPhone "
                    }
                    to="/signup"
                  >
                    Sign Up
                  </NavLink>
                </li>
                <li
                  className="w-full flex justify-center"
                  onClick={() => setShowMenu(false)}
                >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "navlinkPhone active-phone " : " navlinkPhone "
                    }
                    to="/signin"
                  >
                    Sign In
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          </>
        ) : (
          <div className="flex flex-1 justify-end gap-1 items-center">
            <div className="lang">
              <div
                className={
                  "relative mx-2 relative hover:border-[#95bf6d] hover:border-2 ease-in-out duration-300 cursor-pointer border-2 border-gray-300 text-gray-500 flex h-fit gap-2 items-center justify-center rounded-full py-1 px-[10px] bg-white drop-shadow-sm "
                }
              >
                <span className="">{currentLang}</span>

                <div className="absolute top left-[50%] translate-x-[-50%] top-[30px] pt-3 ">
                  <div className="langbtndiv hidden  gap-1 justify-center items-end text-gray-700 bg-white py-1 px-2 rounded-lg border drop-shadow-lg">
                    <button className="py-2 px-4 hover:bg-gray-100" onClick={()=>setCurrentLang("En")}>
                      English
                    </button>
                    <button className="py-2 hover:bg-gray-100 px-4" onClick={()=>setCurrentLang("Fr")}>
                      French
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Tooltip title="open cart" arrow>
              <NavLink
                className=" linkToGoUp "
                to={"/cart"}
                onClick={() => setShowMenu(false)}
              >
                <div
                  className={
                    "addedToCartAnimationOff relative hover:border-[#95bf6d] hover:border-2 ease-in-out duration-300 cursor-pointer border-2 border-gray-300 text-gray-500 flex h-fit gap-2 items-center justify-center rounded-full py-1 px-[10px] bg-white drop-shadow-sm "
                  }
                >
                  <LocalMallOutlinedIcon />
                  <div className="w-[2px] h-5 bg-gray-200 rounded-full"></div>
                  <span className="">{cart.length}</span>
                </div>
              </NavLink>
            </Tooltip>

            <div className=" logout hidden md:block relative">
              <NavLink to={"/profile"}>
                
              <Avatar className="mx-2 " sx={{ width:35 , height: 35,fontSize:"18px", backgroundColor:"#759c53" }}>
                {userInfo?.fname[0].toUpperCase() +
                  userInfo?.lname[0].toUpperCase()}
              </Avatar>
                  </NavLink>
              <div className="logoutbtndiv absolute w-56 hidden justify-center items-end text-gray-700 left-[50%] translate-x-[-50%] top-[30px] pt-6">
                <div className="flex flex-col bg-white rounded-lg border drop-shadow-lg p-3 ">

                <NavLink
                  to={"/profile"}
                  className="bg-white py-2 px-4 hover:bg-gray-200 rounded-md"
                >
                 <AccountCircle/> Your Profile 
                </NavLink>

                <NavLink
                  to={"/favorite"}
                  className="bg-white py-2 px-4  hover:bg-gray-200 rounded-md"
                >
                 <Favorite/> Favorite 
                </NavLink>
                <NavLink
                  to={"/history"}
                  className="bg-white py-2 px-4  hover:bg-gray-200 rounded-md"
                >
                 <History/> Orders History 
                </NavLink>
                  <hr className="m-2"/>
                <div
                  onClick={logout}
                  className="bg-white py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-md"
                >
                 <LogoutIcon /> Log out 
                </div>
                </div>


              </div>
            </div>

            <div className="block md:hidden">
              <IconButton
                className=" button "
                onClick={() => {
                  handelMenuBtnsClick();
                }}
              >
                {showMenu ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </div>

            <div
              className={
                showMenu
                  ? " bg-white w-full h-[calc(100vh-50px)] absolute left-0 top-[50px] p-10 flex flex-col justify-around ztop ease-in-out duration-300"
                  : " bg-white w-full h-[calc(100vh-50px)] absolute left-[-100%]  top-[50px] p-10 flex flex-col justify-around ztop ease-in-out duration-300"
              }
            >
              <ul className="flex flex-col gap-2 text-gray-600 items-center">
                <li
                  className="w-full flex justify-center"
                  onClick={() => setShowMenu(false)}
                >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "navlinkPhone active-phone " : " navlinkPhone "
                    }
                    to="/"
                  >
                    <HomeRoundedIcon /> 
                    {langs.HOME}

                  </NavLink>
                </li>
                <li
                  className="w-full flex justify-center"
                  onClick={() => setShowMenu(false)}
                >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "navlinkPhone active-phone " : " navlinkPhone "
                    }
                    to="/market/"
                  >
                    <StorefrontRoundedIcon /> 
                    {langs.MARKET}
                  </NavLink>
                </li>
                <li
                  className="w-full flex justify-center"
                  onClick={() => setShowMenu(false)}
                >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "navlinkPhone active-phone " : " navlinkPhone "
                    }
                    to="/contact"
                  >
                    <CallRoundedIcon />
                    {langs.CONTACT}
                  </NavLink>
                </li>
              </ul>
              <ul className="flex flex-col gap-2 text-gray-600 items-center">
                <li
                className="navlinkPhone"
                >
              <NavLink
                to={"/profile"}
                onClick={() => setShowMenu(false)}
                ><AccountCircle/> Profile</NavLink>
                </li>
                <li className="navlinkPhone " onClick={logout}>
                  {" "}
                  <LogoutIcon /> Logout {" "}
                </li>

              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
