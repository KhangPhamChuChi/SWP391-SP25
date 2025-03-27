import { useMutation } from "@tanstack/react-query";
import { SubmitQuizDto, SubmitQuizResponse } from "../dto/submit-survey.dto";
import axiosInstance from "../../../axios";

const submitQuiz = async (data: SubmitQuizDto): Promise<SubmitQuizResponse> => {
  const response = await axiosInstance.post("submit", data, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

export const useSubmitQuiz = () => {
  return useMutation<SubmitQuizResponse, Error, SubmitQuizDto>({
    mutationFn: submitQuiz,
  });
};
