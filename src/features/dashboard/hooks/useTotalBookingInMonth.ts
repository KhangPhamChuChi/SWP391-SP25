import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../axios";

const fetchTotalBookingsInMonth = async (): Promise<number> => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  const response = await axiosInstance.get<number>(
    `getTotalBookingsInMonth/${year}/${month}`
  );
  return response.data;
};

export const useTotalBookingsInMonth = () => {
  return useQuery<number, Error>({
    queryKey: ["getTotalBookingsInMonth"],
    queryFn: fetchTotalBookingsInMonth,
    refetchInterval: 10000,
  });
};
