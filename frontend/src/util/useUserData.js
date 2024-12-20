import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../util/CustomFetch"; // Your custom HTTP client or axios instance

const useUserData = (userId = null) => {
  // If a userId is provided, the query key will include it, otherwise fetch general user data
  const queryKey = userId ? ["UserData", userId] : ["UserData"];

  const token = localStorage.getItem("authToken");

  return useQuery({
    queryKey,
    queryFn: async () => {
      const endpoint = userId ? `/users/${userId}` : "/userData";

      const response = await customFetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data || {};
    },
    enabled: Boolean(token) // Ensures query only runs if the token exists
  });
};

export default useUserData;
