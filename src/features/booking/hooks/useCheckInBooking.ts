import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../axios";

interface MutationVariables {
  BookingId: number;
}

export const useCheckInBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MutationVariables>({
    mutationFn: async ({ BookingId }: MutationVariables): Promise<void> => {
      await axiosInstance.put(`api/Booking/checkin/${BookingId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkin"] });
    },
  });
};
