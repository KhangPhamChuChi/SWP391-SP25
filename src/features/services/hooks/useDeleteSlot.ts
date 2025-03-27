import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../axios";

export const useDeleteSlot = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (slotId: number): Promise<void> => {
      await axiosInstance.delete(`api/slot/deleteSlot/${slotId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteService"] });
    },
  });
};
