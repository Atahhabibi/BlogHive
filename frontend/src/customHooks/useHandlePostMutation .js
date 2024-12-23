import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authCustomFetch } from "../util/CustomFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useHandlePostMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await authCustomFetch.post("/handlePost", payload);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("AppData");
      toast.success(data?.message);
    },
    onError: () => {
      toast.error("An error occurred while processing your request.");
    }
  });
};



export { useHandlePostMutation };
