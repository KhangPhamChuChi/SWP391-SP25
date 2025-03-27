import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../axios";

interface MutationVariables {
  bookingId: number;
  amount: number;
}

export const useUpdateServiceAmount = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MutationVariables>({
    mutationFn: async ({
      bookingId,
      amount,
    }: MutationVariables): Promise<void> => {
      await axiosInstance.put(
        `api/Booking/amount/${bookingId}?amount=${amount}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["amount"] });
    },
  });
};
