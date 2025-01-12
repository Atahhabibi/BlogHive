import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authCustomFetch } from "../util/CustomFetch";
import { toast } from "react-toastify";

const useEditAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }) => {
      const response = await authCustomFetch.put(`/handleAccount`, payload, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log(response.data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["UserData"]);

      toast.success("Account updated successfully");
    },
    onError: (error) => {
      toast.error(
        `Error updating account: ${
          error.response?.data?.message || "Unknown error"
        }`
      );
    }
  });
};

export default useEditAccountMutation;
