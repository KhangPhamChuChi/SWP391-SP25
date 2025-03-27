import { useMutation } from "@tanstack/react-query";
import { QuizQuestionDto } from "../dto/quiz-question.dto";
import axiosInstance from "../../../axios";

export const useCreateQuizQuestion = () => {
  return useMutation({
    mutationFn: async (newQuizQuestion: QuizQuestionDto) => {
      const response = await axiosInstance.post(
        `api/QuizQuestion`,
        newQuizQuestion
      );
      return response.data;
    },
  });
};
