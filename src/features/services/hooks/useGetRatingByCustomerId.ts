import { useQuery } from "@tanstack/react-query";
import { RatingDto } from "../../services/dto/rating.dto";
import axiosInstance from "../../../axios";

export const useGetRatingByCustomerId = (customerId?: number) => {
  return useQuery<RatingDto[]>({
    queryKey: ["ratings", customerId],
    queryFn: async () => {
      if (!customerId) return [];
      const response = await axiosInstance.get(
        `api/Rating/customer/${customerId}`
      );
      return response.data;
    },
    enabled: !!customerId, // Chỉ gọi API khi có customerId
  });
};
