import { useQuery } from "@tanstack/react-query";
import { RatingDto } from "../dto/rating.dto";
import axiosInstance from "../../../axios";

export const useRatingByServiceId = (serviceId: number) => {
  return useQuery<RatingDto, Error>({
    queryKey: ["service", serviceId],
    queryFn: async () => {
      const response = await axiosInstance.get<RatingDto>(
        `api/Rating/service/${serviceId}`
      );
      return response.data;
    },
    enabled: !!serviceId,
  });
};
