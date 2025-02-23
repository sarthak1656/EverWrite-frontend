import React, { useState } from "react";
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa6";

const Passwordinput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3 border-gray-300">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className=" w-full text-sm bg-transparent py-3 mr-3 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
      />
     {isShowPassword? <FaRegEye
        size={22}
        className="cursor-pointer text-blue-500"
        onClick={toggleShowPassword}
      />:<FaRegEyeSlash
      size={22}
      className="cursor-pointer text-gray-500"
      onClick={toggleShowPassword}
    />}
    </div>
  );
};

export default Passwordinput;
