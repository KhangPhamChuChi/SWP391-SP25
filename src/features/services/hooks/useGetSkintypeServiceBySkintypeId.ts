import { useQuery } from "@tanstack/react-query";
import { SkintypeServiceDto } from "../dto/skintype-service.dto";
import axiosInstance from "../../../axios";

export const useSkintypeServiceBySkintypeId = (skintypeId: string) => {
  return useQuery<SkintypeServiceDto, Error>({
    queryKey: ["getSkintypeServiceBySkintypeId", skintypeId],
    queryFn: async () => {
      const response = await axiosInstance.get<SkintypeServiceDto>(
        `getSkintypeServiceBySkintypeId/${skintypeId}`
      );
      return response.data;
    },
    enabled: !!skintypeId,
  });
};
