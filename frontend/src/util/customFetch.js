import axios from "axios";

// Dynamic Base URL
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : "https://blogpillar.onrender.com/api/v1";

export const customFetch = axios.create({
  baseURL: BASE_URL
});

export const authCustomFetch = axios.create({
  baseURL: BASE_URL
});

authCustomFetch.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("authToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

    
      if (config.data && config.data.image instanceof File) {
        const formData = new FormData();
        Object.entries(config.data).forEach(([key, value]) => {
          formData.append(key, value);
        });
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


authCustomFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);
