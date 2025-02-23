import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://everwrite-backend.onrender.com", // ✅ Correct Backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Ensure credentials are included
});

// 🔥 Add token to headers
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
