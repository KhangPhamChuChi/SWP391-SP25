import { useQuery } from "@tanstack/react-query";
import { ServiceDto } from "../dto/get-service.dto";
import axiosInstance from "../../../axios";

const fetchServices = async (): Promise<ServiceDto[]> => {
  const response = await axiosInstance.get<ServiceDto[]>(
    "api/service/getAllServices"
  );
  return response.data;
};

export const useServices = () => {
  return useQuery<ServiceDto[], Error>({
    queryKey: ["getAllServices"],
    queryFn: fetchServices,
  });
};
