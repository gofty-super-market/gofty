import React, { useContext } from "react";
import { PinInput, PinInputField, HStack } from "@chakra-ui/react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyIcon from "@mui/icons-material/Key";
import { UserId } from "../context/userId";
import axios from "axios";

export default function EmailCode({ emailCode }) {
  const api = axios.create({
    baseURL: "https://ayshadashboard.com/api",
  });
  const [value, setValue] = React.useState("");
  const { userId, setUserId } = useContext(UserId);

  const check = () => {
    let cartFormData = new FormData();
    cartFormData.append("id_client", userId || 0);
    cartFormData.append("code", value);
    console.log(cartFormData);
    api({
      method: "post",
      url: "client-email-verification",
      data: cartFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      if (res.data == "1") {
        emailCode();
      } else {
        alert("code validation is not correct");
      }
    });
  };
  return (
    <div className="mt-12 h-[90vh] md:h-[70vh] flex flex-col gap-8 justify-center items-center">
      <KeyIcon sx={{ fontSize: 150 }} className="text-3xl text-gray-700" />
      <h3>enter the code in your email</h3>
      <div className="flex flex-row">
        <PinInput
          manageFocus={true}
          type="alphanumeric"
          className="flex gap-5 "
          onChange={(e) => setValue(e)}
        >
          <PinInputField className="mx-2 w-16 border rounded-xl h-16 p-3 flex items-center justify-center text-center text-xl " />
          <PinInputField className="mx-2 w-16 border rounded-xl h-16 p-3 flex items-center justify-center text-center text-xl " />
          <PinInputField className="mx-2 w-16 border rounded-xl h-16 p-3 flex items-center justify-center text-center text-xl " />
          <PinInputField className="mx-2 w-16 border rounded-xl h-16 p-3 flex items-center justify-center text-center text-xl " />
        </PinInput>
      </div>
      <button onClick={check} className="button bg-prime text-white py-2 px-4 flex gap-2 justify-center items-center">
        Verify OTP <ArrowForwardIcon />
      </button>
    </div>
  );
}
