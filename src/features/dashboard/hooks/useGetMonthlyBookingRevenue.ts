import { useQuery } from "@tanstack/react-query";
import { MonthlyBookingRevenue } from "../dto/dashboard.dto";
import axiosInstance from "../../../axios";

const fetchMonthlyBookingRevenue = async (): Promise<
  MonthlyBookingRevenue[]
> => {
  const year = new Date().getFullYear();

  const response = await axiosInstance.get<MonthlyBookingRevenue[]>(
    `getMonthlyBookingRevenue/${year}`
  );
  return response.data;
};

export const useMonthlyBookingRevenue = () => {
  return useQuery<MonthlyBookingRevenue[], Error>({
    queryKey: ["getMonthlyBookingRevenue"],
    queryFn: fetchMonthlyBookingRevenue,
    refetchInterval: 10000,
  });
};
