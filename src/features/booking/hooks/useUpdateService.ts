import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../axios";

interface MutationVariables {
  bookingId: number;
  serviceName: string;
}

export const useUpdateServiceName = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MutationVariables>({
    mutationFn: async ({
      bookingId,
      serviceName,
    }: MutationVariables): Promise<void> => {
      await axiosInstance.put(
        `api/Booking/serviceName/${bookingId}?serviceName=${serviceName}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceName"] });
    },
  });
};
