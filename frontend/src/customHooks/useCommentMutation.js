import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authCustomFetch } from "../util/CustomFetch";
import { toast } from "react-toastify";

const useCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (comment) => {
      try {
        const response = await authCustomFetch.post("/handleComment", comment);
        queryClient.invalidateQueries(["Post"]);

        return response.data; // Return only the data
      } catch (error) {
        // Log error for debugging
        console.error("Comment mutation error:", error);
        throw error; // Throw error to trigger onError callback
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["Post"]);

      toast.success("Comment successfully submitted!");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while submitting your comment.";
      toast.error(errorMessage);
    }
  });
};

export default useCommentMutation;
