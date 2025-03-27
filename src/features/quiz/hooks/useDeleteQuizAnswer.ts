import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../axios";

export const useDeleteQuizAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, number>({
    mutationFn: async (id: number) => {
      const response = await axiosInstance.delete<{ message: string }>(
        `api/QuizAnswer/${id}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["QuizAnswer"] });
    },
  });
};
