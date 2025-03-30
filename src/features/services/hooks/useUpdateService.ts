import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ServiceDto } from "../dto/get-service.dto";
import axiosInstance from "../../../axios";

interface MutationVariables {
  serviceId: string;
  data: ServiceDto;
}

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MutationVariables>({
    mutationFn: async ({
      serviceId,
      data,
    }: MutationVariables): Promise<void> => {
      await axiosInstance.put(`api/service/updateService/${serviceId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateService"] });
    },
  });
};
