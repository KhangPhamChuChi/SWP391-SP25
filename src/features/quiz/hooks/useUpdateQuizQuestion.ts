import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QuizQuestionDto } from "../dto/quiz-question.dto";
import axiosInstance from "../../../axios";

interface MutationVariables {
  quizquestionId: number;
  data: QuizQuestionDto;
}

export const useUpdateQuizQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MutationVariables>({
    mutationFn: async ({
      quizquestionId,
      data,
    }: MutationVariables): Promise<void> => {
      await axiosInstance.put(`api/QuizQuestion/${quizquestionId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["QuizQuestion"] });
    },
  });
};
