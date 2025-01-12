import { useMutation } from "@tanstack/react-query";
import { authCustomFetch } from "../util/CustomFetch";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ payload }) => {
      const response = await authCustomFetch.post("/createPost", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["UserData"]);
      toast.success("Post created successfully!");
    },
    onError: (error) => {
      console.error(
        "Error creating post:",
        error.response?.data || error.message
      );
      toast.error("Something went wrong. Please try again.");
    }
  });

  return mutation; // Return the entire mutation object
};

export default useCreatePostMutation;
