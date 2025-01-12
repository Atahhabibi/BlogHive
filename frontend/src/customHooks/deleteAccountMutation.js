import { useMutation } from "@tanstack/react-query";
import { authCustomFetch } from "../util/CustomFetch";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await authCustomFetch.delete("/deleteAccount");
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["UserData"]);
      toast.success("Account deleted successfully!");
      localStorage.removeItem("authToken");
      window.location.href = "/";
    },
    onError: (error) => {
      console.error(
        "Error deleting account:",
        error.response?.data || error.message
      );
      toast.error("Failed to delete the account. Please try again.");
    }
  });
};

export default useDeleteAccountMutation;
