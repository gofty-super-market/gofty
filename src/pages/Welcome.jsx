import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WelcomeLogo from "../imgs/welcome.png";
function Welcome() {
  return (
    <div className="min-h-[80vh] flex justify-center items-center mt-20 flex-col gap-7">
      <img src={WelcomeLogo} className="w-40"></img>
      <h1 className="text-3xl text-gray-700">Welcome to gofty</h1>
      <Link
        className="px-6 py-3 flex justify-center items-center gap-4 button bg-prime rounded-full text-white"
        to="/market/"
      >
        Start shopping
        <ArrowForwardIcon/>
      </Link>
    </div>
  );
}

export default Welcome;
