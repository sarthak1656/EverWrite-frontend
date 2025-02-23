import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Passwordinput from "../../components/Input/Passwordinput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }

    try {
      const response = await axiosInstance.post("/api/users/login", { email, password });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-20 px-4">
        <div className="w-96 max-w-md p-6 bg-white rounded-lg shadow-lg">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-6 text-center font-semibold">Login</h4>
            <input
              type="text"
              placeholder="Email"
              className="input-box w-full p-3 border rounded-md mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Passwordinput value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button type="submit" className="btn-primary w-full mt-4 py-3">Login</button>
            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link to="/signup" className="font-medium text-blue-500 underline">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
