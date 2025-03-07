import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("please enter a valid email");
      return;
    }
    if (!password) {
      setError("please enter password");
      return;
    }
    setError("");
    try {
      const responce = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });
      if (responce.data && responce.data.accessToken) {
        localStorage.setItem("token", responce.data.accessToken)
        navigate("/dashboard")
      }
    } catch (error) {
      if(error.response.data.message && error.response&&error.response.data){
        setError(error.response.data.message)
      }else{
        setError("Failed to login")
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded px-7 py-10 bg-white border-slate-200">
          <form action="" onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button type="submit" className="btn-primary">
              Login
            </button>
            <p className="text-sm text-center mt-4 ">
              Not registered yet?
              <Link
                to="/signup"
                className="font-medium text-blue-600 underline"
              >
                {" "}
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
