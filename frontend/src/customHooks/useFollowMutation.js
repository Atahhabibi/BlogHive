import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authCustomFetch } from "../util/CustomFetch";
import { toast } from "react-toastify";

const useFollowMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }) => {
      try {
        const response = await authCustomFetch(`/handleFollower/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Unknown error occurred"
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["UserData"]);
      toast.success("Follower added successfully!");
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while handling the follower"
      );
    }
  });
};

export default useFollowMutation;
