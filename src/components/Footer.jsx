import logo from "../imgs/minilogo.png"
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { IconButton } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FmdGoodIcon from '@mui/icons-material/FmdGood';


import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';


export const Footer = () => {
    return (
        <div className="w-full flex justify-center  bg-[#fff]">

        <div className="max-w-[1200px] text-gray-700 px-10 items-center justify-around py-16 mt-16 bg-[#fff] bg-red flex flex-col lg:flex-row gap-16 md:gap-24  ">
            <div className=" flex flex-col gap-3 ">
                <div className="flex flex-row gap-8 flex-col md:flex-row ">
                    <img src={logo} alt="" className="w-20 h-20 object-cover" />
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-medium">GOFTY</h3>
                        <p className="max-w-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id reprehenderit ipsum facilis libero a nisi temporibus laboriosam expedita sit molestiae cum saepe repellendus tenetur delectus, fugiat rerum qui facere? Necessitatibus.</p>
                        <div className="flex">
                            <IconButton>
                                <InstagramIcon />
                            </IconButton>
                            <IconButton>
                                <FacebookIcon />
                            </IconButton>
                            <IconButton>
                                <TwitterIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>

            </div>
            <div className="flex-1 flex flex-col sm:flex-row gap-10 justify-around w-full lg:w-fit text-gray-700 gap-16 md:gap-24">

            <div className="flex flex-col gap-3">
                <h3 className="text-xl font-medium">Our Pages</h3>
                <ul className="flex flex-col gap-3">
                    <li className="flex gap-2 items-center"><HomeRoundedIcon/>Home</li>
                    <li className="flex gap-2 items-center"><StorefrontRoundedIcon/> Market</li>
                    <li className="flex gap-2 items-center"><PhoneIcon/>Contact</li>
                    <li className="flex gap-2 items-center"><LocalMallRoundedIcon/>Cart</li>
                </ul>
            </div>
            <div className="flex flex-col gap-3">
                <h3 className="text-xl font-medium">Contact Us</h3>
                <ul className="flex flex-col gap-3">
                    <li className="flex gap-2 items-center"><PhoneIcon/>123546789</li>
                    <li className="flex gap-2 items-center"><EmailIcon/> contact@gofty.com</li>
                    <li className="flex gap-2 items-center"><FmdGoodIcon/> somewhere in earth</li>
                </ul>
            </div>
            </div>
        </div>
        </div>
    )
}
