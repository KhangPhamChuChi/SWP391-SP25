import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../axios";

export const useDeleteQuizQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id: number): Promise<void> => {
      await axiosInstance.delete(`api/QuizQuestion/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["QuizQuestion"] });
    },
  });
};
