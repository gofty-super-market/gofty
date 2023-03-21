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
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
          similique eligendi quisquam natus! Magnam tempora aliquid iste
          mollitia obcaecati ipsa aspernatur soluta cumque distinctio quos
          placeat, molestiae architecto eius fugiat! Aliquid, quis rerum beatae
          earum illum repellendus? Minus exercitationem atque deleniti esse
          laudantium minima, quos omnis a eos ut rerum vitae maiores similique
          incidunt corporis, optio illo itaque alias unde? Id maiores
          perspiciatis repellat laboriosam, alias quibusdam dolorum corrupti, ab
          inventore incidunt aliquam corporis iste ducimus autem tempore nostrum
          modi ipsam at nihil praesentium suscipit ipsa voluptate. Suscipit,
          veniam reprehenderit. In qui libero labore cupiditate laudantium vero
          harum suscipit ipsam voluptatem? Neque optio ducimus illum iure
          necessitatibus, nam laborum asperiores tempore corporis est dolores
          porro earum ea facere libero in! Maxime deserunt odit quia veritatis
          non corporis? Necessitatibus magnam consequatur placeat minus
          reiciendis ullam labore error molestiae? Reprehenderit, consectetur?
          Quos totam harum adipisci ipsa neque assumenda eaque accusamus
          perferendis hic. Voluptates animi neque laudantium reprehenderit sit
          vero impedit non sint ab, maiores repudiandae consequuntur, tenetur
          iure eos fuga suscipit eius nesciunt est delectus accusamus vitae
          voluptate perferendis ut. Voluptatum, rem? Fugit distinctio dolorem,
          fugiat labore nulla similique accusamus eaque deleniti dolor nihil
          autem veritatis dolore. Officiis mollitia fugit praesentium quisquam
          maxime rerum magni harum atque ratione repudiandae iste, dolores
          beatae. Veritatis labore porro dicta non. Exercitationem quo
          recusandae fuga dolor? Fugit odio mollitia molestiae tempora quod
          magni molestias inventore ex, qui doloremque officia tenetur quis,
          nesciunt veniam minus distinctio praesentium. Doloribus doloremque
          voluptatem dolore quae distinctio? Quasi alias adipisci praesentium
          deleniti facilis consequatur hic non, repudiandae fugiat? Saepe
          consectetur optio repellat voluptatem sunt at dignissimos, ad rerum
          exercitationem. Delectus, obcaecati. Incidunt, vel, ipsa repellat
          officiis ea hic odio dolorum placeat aperiam quisquam adipisci
          voluptatem quasi accusamus, veniam eum velit consequuntur quidem
          labore! Suscipit distinctio autem, fuga accusamus ab repellendus
          consequuntur.
        </p>
      </div>
    </div>
  );
}

export default Profile;
