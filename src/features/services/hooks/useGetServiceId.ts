import { useQuery } from "@tanstack/react-query";
import { ServiceDto } from "../dto/get-service.dto";
import axiosInstance from "../../../axios";

export const useServiceById = (serviceId: string) => {
  return useQuery<ServiceDto, Error>({
    queryKey: ["getServiceById", serviceId],
    queryFn: async () => {
      const response = await axiosInstance.get<ServiceDto>(
        `api/service/getServiceById/${serviceId}`
      );
      return response.data;
    },
    enabled: !!serviceId,
  });
};
