import { useMutation } from "@tanstack/react-query";
import { authCustomFetch} from "../util/CustomFetch";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, commentId }) => {
      const response = await authCustomFetch.delete(
        `/posts/${postId}/comment/${commentId}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      queryClient.invalidateQueries(["UserData"]);
    },
    onError: () => {
      toast.error("Error deleting the comment");
    }
  });
};

export default useDeleteCommentMutation;
