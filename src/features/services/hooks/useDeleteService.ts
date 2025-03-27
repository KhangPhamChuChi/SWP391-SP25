import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../axios";

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id: string): Promise<void> => {
      await axiosInstance.delete(`api/service/deleteService/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteService"] });
    },
  });
};
