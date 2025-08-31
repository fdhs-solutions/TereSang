// src/config/AxiosConfig.js
import axios from "axios";
import { ApiUrl } from "./Config";

export const AxiosConfig = axios.create({ baseURL: ApiUrl });
export const ProtectedAxiosConfig = axios.create({ baseURL: ApiUrl });

// Add token interceptor
ProtectedAxiosConfig.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.data?.jwtToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);
