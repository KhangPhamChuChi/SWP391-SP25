import { useQuery } from "@tanstack/react-query";
import { SlotDto } from "../dto/slot.dto";
import axiosInstance from "../../../axios";

const fetchAvailableSlots = async (): Promise<SlotDto[]> => {
  const response = await axiosInstance.get<SlotDto[]>(
    "api/slot/getAvailableSlots"
  );
  return response.data;
};

export const useAvailableSlot = () => {
  return useQuery<SlotDto[], Error>({
    queryKey: ["getAvailableSlots"],
    queryFn: fetchAvailableSlots,
  });
};
