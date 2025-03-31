import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../axios";

interface MutationVariables {
  bookingId: number;
  serviceId: number;
}

export const useUpdateServiceName = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MutationVariables>({
    mutationFn: async ({
      bookingId,
      serviceId,
    }: MutationVariables): Promise<void> => {
      await axiosInstance.put(
        `api/Booking/serviceName/${bookingId}?serviceId=${serviceId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceName"] });
    },
  });
};
