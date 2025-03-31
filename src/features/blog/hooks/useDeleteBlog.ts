import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../axios";

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id: string): Promise<void> => {
      await axiosInstance.delete(`deleteBlog/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteBlog"] });
    },
  });
};
