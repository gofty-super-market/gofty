import logo from "../imgs/minilogo.png"
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { IconButton } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import { Link } from "react-router-dom";


export const Footer = () => {
    return (
        <>
        <div className="mt-20 w-full flex justify-center text-white bg-[#759c53]">

        <div className="max-w-[1300px] px-10 items-center justify-around py-16 mt-16  bg-red flex flex-col lg:flex-row gap-12 md:gap-12  ">
            <div className=" flex flex-col gap-3 ">
                <div className="flex gap-8 flex-col md:flex-row ">
                    <img src={logo} alt="" className="w-20 h-20 object-cover drop-shadow-lg" />
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-medium">GOFTY</h3>
                        <p className="max-w-sm">Nous offrons toutes sortes de produits alimentaires aux mêmes prix du marché avec une livraison à domicile garantie</p>
                        <div className="flex text-white">
                            <IconButton>
                                <InstagramIcon className="text-white"/>
                            </IconButton>
                            <IconButton>
                                <FacebookIcon className="text-white"/>
                            </IconButton>
                            <IconButton>
                                <TwitterIcon className="text-white"/>
                            </IconButton>
                        </div>
                    </div>
                </div>

            </div>
            <div className="flex-1 flex flex-col sm:flex-row justify-around w-full lg:w-fit gap-12 md:gap-12">

            <div className="flex flex-col gap-3">
                <h3 className="text-xl font-medium">Our Pages</h3>
                <ul className="flex flex-col gap-3">
                    <Link to={"/"}><li className="flex gap-2 items-center"><HomeRoundedIcon/>Home</li></Link>
                    <Link to={"/market"}><li className="flex gap-2 items-center"><StorefrontRoundedIcon/> Market</li></Link>
                    <Link to={"/contact"}><li className="flex gap-2 items-center"><PhoneIcon/>Contact</li></Link>
                    <Link to={"/cart"}><li className="flex gap-2 items-center"><LocalMallRoundedIcon/>Cart</li></Link>
                </ul>
            </div>
            <div className="flex flex-col gap-3">
                <h3 className="text-xl font-medium">Contact Us</h3>
                <ul className="flex flex-col gap-3">
                    <li className="flex gap-2 items-center"><PhoneIcon/>123546789</li>
                    <li className="flex gap-2 items-center"><EmailIcon/> contact@gofty.com</li>
                    <li className="flex gap-2 items-center"><FmdGoodIcon/>La fondation hassan 2, berradi 1 Marrakech</li>
                </ul>
            </div>
            <div className="flex flex-col gap-3">
                <h3 className="text-xl font-medium">Company</h3>
                <ul className="flex flex-col gap-3">
                    <Link to={"/terms"}><li className="flex gap-2 items-center">< ListAltIcon/>Terms</li></Link>
                    <Link to={"/privacy"}><li className="flex gap-2 items-center"><VerifiedUserIcon/> Privacy</li></Link>
                </ul>
            </div>
            </div>
        </div>
        </div>
        <h1 className="bg-[#759c53] text-center text-sm p-5 text-white">Copyright © 2023 Gofty Company</h1>
        </>
    )
}
