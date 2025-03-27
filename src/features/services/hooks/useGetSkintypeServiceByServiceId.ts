import { useQuery } from "@tanstack/react-query";
import { SkintypeServiceDto } from "../dto/skintype-service.dto";
import axiosInstance from "../../../axios";

export const useSkintypeServiceByServiceId = (serviceId: string) => {
  return useQuery<SkintypeServiceDto, Error>({
    queryKey: ["getSkintypeServiceByServiceId", serviceId],
    queryFn: async () => {
      const response = await axiosInstance.get<SkintypeServiceDto>(
        `getSkintypeServiceByServiceId/${serviceId}`
      );
      return response.data;
    },
    enabled: !!serviceId,
  });
};
