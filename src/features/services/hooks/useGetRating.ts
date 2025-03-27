import { useQuery } from "@tanstack/react-query";
import { RatingDto } from "../dto/rating.dto";
import axiosInstance from "../../../axios";

const fetchAllRatings = async (): Promise<RatingDto[]> => {
  const response = await axiosInstance.get<RatingDto[]>("api/Rating/all");
  return response.data;
};

const fetchRatingById = async (
  customerId?: number,
  serviceId?: number
): Promise<number> => {
  if (!customerId || !serviceId) {
    console.warn("❌ Thiếu customerId hoặc serviceId khi fetch rating!");
    return 0;
  }

  try {
    const response = await axiosInstance.get<RatingDto>(
      `api/Rating/${customerId}/${serviceId}`
    );
    return response.data?.stars || 0;
  } catch (error) {
    console.error("❌ Lỗi khi lấy đánh giá:", error);
    return 0;
  }
};

export const useRatings = () => {
  return useQuery<RatingDto[], Error>({
    queryKey: ["all"],
    queryFn: fetchAllRatings,
    staleTime: 1000 * 60 * 5,
  });
};

// Hook lấy rating theo customerId và serviceId
export const useRatingById = (customerId?: number, serviceId?: number) => {
  return useQuery<number, Error>({
    queryKey: ["rating", customerId, serviceId],
    queryFn: () => fetchRatingById(customerId, serviceId),
    enabled: Boolean(customerId && serviceId), // Chỉ gọi API nếu có đủ dữ liệu
    staleTime: 1000 * 60 * 5, // Giữ cache trong 5 phút
  });
};
