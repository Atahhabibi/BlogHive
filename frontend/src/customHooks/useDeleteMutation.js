import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authCustomFetch } from "../util/CustomFetch";
import { toast } from "react-toastify";

const useDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }) => {
      try {
        const response = await authCustomFetch.delete(`/deletePost/${id}`);

        console.log(response);
        return response.data;
      } catch (error) {
        throw new Error("Failed to delete the post");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["UserData"]);

      toast.success("Post deleted successfully!");
    },
    onError: (error) => {
      toast.error(
        error?.message || "There was an error while deleting the post!"
      );
    }
  });
};

export default useDeleteMutation;
