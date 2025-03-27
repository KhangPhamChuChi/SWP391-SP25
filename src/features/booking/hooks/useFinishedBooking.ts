import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
interface MutationVariables {
  BookingId: number;
}
export const useFinishedBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MutationVariables>({
    mutationFn: async ({ BookingId }: MutationVariables): Promise<void> => {
      await axios.put(
        `https://localhost:7071/api/Booking/finished/${BookingId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["finished"] });
    },
  });
};
