import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://combative-moccasins-fish.cyclic.app",
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const access_token = Cookies.get("access_token");
    
    if (access_token && !config.headers.Authorization) {

      config.headers.Authorization = `Bearer ${access_token}`;
      
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
