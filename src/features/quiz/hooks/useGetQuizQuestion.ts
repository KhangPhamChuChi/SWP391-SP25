import { useQuery } from "@tanstack/react-query";
import { QuizQuestionDto } from "../dto/quiz-question.dto";
import axiosInstance from "../../../axios";

const fetchQuizQuestion = async (): Promise<QuizQuestionDto[]> => {
  const response = await axiosInstance.get<QuizQuestionDto[]>(
    "api/QuizQuestion"
  );
  return response.data;
};

export const useQuizQuestion = () => {
  return useQuery<QuizQuestionDto[], Error>({
    queryKey: ["QuizQuestion"],
    queryFn: fetchQuizQuestion,
  });
};
