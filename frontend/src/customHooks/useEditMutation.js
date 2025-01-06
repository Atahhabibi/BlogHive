import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authCustomFetch } from "../util/CustomFetch";
import { toast } from "react-toastify";

const useEditMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, newPost }) => {
      try {
        const response = await authCustomFetch.put(`/editPost/${id}`, newPost, {
          headers: {
            "Content-Type": "multipart/form-data" // Important for FormData
          }
        });
        return response.data;
      } catch (error) {
        throw new Error("Failed to edit the post");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["UserData"]);

      toast.success("Post edited successfully!");
    },
    onError: (error) => {
      toast.error(
        error?.message || "There was an error while editing the post!"
      );
    }
  });
};

export default useEditMutation;
