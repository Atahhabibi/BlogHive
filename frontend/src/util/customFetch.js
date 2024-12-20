import axios from "axios";

export const customFetch = axios.create({
  baseURL: "http://localhost:5000/api/v1"
});

export const authCustomFetch = axios.create({
  baseURL: "http://localhost:5000/api/v1"
});

// Add an interceptor to attach the Authorization header
authCustomFetch.interceptors.request.use(
  (config) => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("authToken");

      // If token exists, add it to the Authorization header
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config; // Return the modified config
    } catch (error) {
      console.error("Error in request interceptor:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    // Handle errors during the request setup
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);


