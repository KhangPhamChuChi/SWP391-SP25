import { useQuery } from "@tanstack/react-query";
import { QuizAnswerDto } from "../dto/quiz-answer.dto";
import axiosInstance from "../../../axios";

const fetchQuizAnswer = async (): Promise<QuizAnswerDto[]> => {
  const response = await axiosInstance.get<QuizAnswerDto[]>("api/QuizAnswer");
  return response.data;
};

export const useQuizAnswer = () => {
  return useQuery<QuizAnswerDto[], Error>({
    queryKey: ["QuizAnswer"],
    queryFn: fetchQuizAnswer,
  });
};
