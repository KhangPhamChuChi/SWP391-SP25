import { useMutation } from "@tanstack/react-query";
import { ServiceDto } from "../dto/get-service.dto";
import axiosInstance from "../../../axios";

export const useCreateService = () => {
  return useMutation({
    mutationFn: async (newService: ServiceDto) => {
      const response = await axiosInstance.post(
        `api/service/createService`,
        newService
      );
      return response.data;
    },
  });
};
