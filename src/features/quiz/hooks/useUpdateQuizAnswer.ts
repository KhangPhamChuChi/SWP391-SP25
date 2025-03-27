import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QuizAnswerDto } from "../dto/quiz-answer.dto";
import axiosInstance from "../../../axios";

interface MutationVariables {
  answerId: number;
  data: QuizAnswerDto;
}

export const useUpdateQuizAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MutationVariables>({
    mutationFn: async ({
      answerId,
      data,
    }: MutationVariables): Promise<void> => {
      await axiosInstance.put(`api/QuizAnswer/${answerId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["QuizAnswer"] });
    },
  });
};
