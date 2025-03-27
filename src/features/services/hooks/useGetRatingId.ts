import { useQuery } from "@tanstack/react-query";
import { RatingDto } from "../dto/rating.dto";
import axiosInstance from "../../../axios";

export const useRatingById = (ratingId: number) => {
  return useQuery<RatingDto, Error>({
    queryKey: ["Rating", ratingId],
    queryFn: async () => {
      const response = await axiosInstance.get<RatingDto>(
        `api/Rating/${ratingId}`
      );
      return response.data;
    },
    enabled: !!ratingId,
  });
};
