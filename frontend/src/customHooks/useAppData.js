import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../util/CustomFetch";

const useAppData = () => {
  return useQuery({
    queryKey: ["AppData"],
    queryFn: async () => {
      try {
        // Wait for both API calls to complete
        const [userResponse, postsResponse] = await Promise.all([
          customFetch("/users"),
          customFetch("/posts")
        ]);

        // Extract data from responses
        const users = userResponse.data || [];
        const posts = postsResponse.data || [];

        return { users, posts };
      } catch (error) {
        console.error("Error fetching app data:", error);
        throw new Error("Failed to fetch app data");
      }
    }
  });
};

export default useAppData;
