import { useQuery } from "@tanstack/react-query";
import { ServiceDto } from "../dto/get-service.dto";
import axiosInstance from "../../../axios";

const fetchServiceBySkinTherapistId = async (
  skintherapistId: number
): Promise<ServiceDto[]> => {
  if (!skintherapistId) throw new Error("SkinTherapistId is needed");

  const response = await axiosInstance.get<ServiceDto[]>(
    `api/service/getServiceBySkintherapistId/${skintherapistId}`
  );
  return response.data;
};

export const useGetServiceByTherapistId = (skintherapistId: number) => {
  return useQuery<ServiceDto[], Error>({
    queryKey: ["getServiceBySkintherapistId", skintherapistId],
    queryFn: () => fetchServiceBySkinTherapistId(skintherapistId),
    enabled: !!skintherapistId,
  });
};
