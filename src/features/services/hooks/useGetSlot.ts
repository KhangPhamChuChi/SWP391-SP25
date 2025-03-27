import { useQuery } from "@tanstack/react-query";
import { SlotDto } from "../dto/slot.dto";
import axiosInstance from "../../../axios";

const fetchSlots = async (): Promise<SlotDto[]> => {
  const response = await axiosInstance.get<SlotDto[]>("api/slot/getAllSlots");
  return response.data;
};

export const useSlots = () => {
  return useQuery<SlotDto[], Error>({
    queryKey: ["getAllSlots"],
    queryFn: fetchSlots,
  });
};
