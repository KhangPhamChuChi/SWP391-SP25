import { useQuery } from "@tanstack/react-query";
import { RoleCountDto } from "../dto/dashboard.dto";
import axiosInstance from "../../../axios";

const fetchRoleCounts = async (): Promise<RoleCountDto[]> => {
  const response = await axiosInstance.get<RoleCountDto[]>("getRoleCounts");
  return response.data;
};

export const useRoleCounts = () => {
  return useQuery<RoleCountDto[], Error>({
    queryKey: ["getRoleCounts"],
    queryFn: fetchRoleCounts,
    refetchInterval: 10000,
  });
};
