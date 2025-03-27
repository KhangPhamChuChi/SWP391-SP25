import { useMutation } from "@tanstack/react-query";
import { RatingDto } from "../dto/rating.dto";
import axiosInstance from "../../../axios";

export const useCreateRating = () => {
  return useMutation({
    mutationFn: async (newRating: RatingDto) => {
      const response = await axiosInstance.post(`api/Rating`, newRating);
      return response.data;
    },
  });
};
