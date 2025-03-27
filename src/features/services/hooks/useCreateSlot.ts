import { useMutation } from "@tanstack/react-query";
import { SlotDto } from "../dto/slot.dto";
import axiosInstance from "../../../axios";

export const useCreateSlot = () => {
  return useMutation({
    mutationFn: async (newSlot: SlotDto) => {
      const response = await axiosInstance.post(`api/slot/createSlot`, newSlot);
      return response.data;
    },
  });
};
