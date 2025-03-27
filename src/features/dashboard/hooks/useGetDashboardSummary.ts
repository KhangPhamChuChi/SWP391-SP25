import { useQuery } from "@tanstack/react-query";
import { DashboardDto } from "../dto/dashboard.dto";
import axiosInstance from "../../../axios";

const fetchDashboardSummary = async (): Promise<DashboardDto> => {
  const response = await axiosInstance.get<DashboardDto>("getDashboardSummary");
  return response.data;
};

export const useDashboardSummary = () => {
  return useQuery<DashboardDto, Error>({
    queryKey: ["getDashboardSummary"],
    queryFn: fetchDashboardSummary,
  });
};
