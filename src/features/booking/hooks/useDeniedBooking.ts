import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../axios";

interface MutationVariables {
  BookingId: number;
}
export const useDeniedBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MutationVariables>({
    mutationFn: async ({ BookingId }: MutationVariables): Promise<void> => {
      await axiosInstance.put(`api/Booking/denied/${BookingId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["denied"] });
    },
  });
};
