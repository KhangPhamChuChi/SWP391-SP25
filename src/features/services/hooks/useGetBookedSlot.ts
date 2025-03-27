import { useQuery } from "@tanstack/react-query";
import { SlotDto } from "../dto/slot.dto";
import axiosInstance from "../../../axios";

// API call to get booked slots
const fetchBookedSlots = async (): Promise<SlotDto[]> => {
  const response = await axiosInstance.get<SlotDto[]>(
    "api/slot/getBookedSlots"
  );
  return response.data;
};

// FIXED: Correct queryKey and function
export const useBookedSlot = () => {
  return useQuery<SlotDto[], Error>({
    queryKey: ["getBookedSlots"],
    queryFn: fetchBookedSlots,
  });
};
