import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../axios";

export const useDeleteSkin = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (skintypeId: number): Promise<void> => {
      await axiosInstance.delete(`api/skintype/deleteSkintype/${skintypeId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteService"] });
    },
  });
};
