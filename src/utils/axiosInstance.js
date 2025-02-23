import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://everwrite-backend.onrender.com", // ✅ Correct backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 🔥 Important for cookies/auth
});

// Add token to requests if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("No token found in localStorage.");
  }
  return config;
});

export default axiosInstance;
