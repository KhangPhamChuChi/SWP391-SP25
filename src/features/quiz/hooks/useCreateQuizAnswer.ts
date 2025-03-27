import { useMutation } from "@tanstack/react-query";
import { QuizAnswerDto } from "../dto/quiz-answer.dto";
import axiosInstance from "../../../axios";

export const useCreateQuizAnswer = () => {
  return useMutation({
    mutationFn: async (newQuizAnswer: QuizAnswerDto) => {
      const response = await axiosInstance.post(
        `api/QuizAnswer`,
        newQuizAnswer
      );
      return response.data;
    },
  });
};
