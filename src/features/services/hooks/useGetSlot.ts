import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SlotDto } from "../dto/slot.dto";

const fetchSlots = async (): Promise<SlotDto[]> => {
  const response = await axios.get<SlotDto[]>(
    "https://localhost:7071/api/slot/getAllSlots"
  );
  return response.data;
};

export const useSlots = () => {
  return useQuery<SlotDto[], Error>({
    queryKey: ["getAllSlots"],
    queryFn: fetchSlots,
  });
};
