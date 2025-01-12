import axios from "axios";

export const customFetch = axios.create({
  baseURL: "http://localhost:5000/api/v1"
});

export const authCustomFetch = axios.create({
  baseURL: "http://localhost:5000/api/v1"
});


authCustomFetch.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("authToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (config.data && config.data.image) {
        const formData = new FormData();
        for (const key in config.data) {
          formData.append(key, config.data[key]);
        }
        config.data = formData;
        config.headers["Content-Type"] = "multipart/form-data";
      }

      return config;
    } catch (error) {
      console.error("Error in request interceptor:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);
