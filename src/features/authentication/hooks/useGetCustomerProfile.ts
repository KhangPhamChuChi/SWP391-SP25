import { useQuery } from "@tanstack/react-query";
import { CustomerProfileDto } from "../dto/profile.dto";
import axiosInstance from "../../../axios";

export const useGetCustomerProfile = (accountId?: number, role?: string) => {
  return useQuery({
    queryKey: ["getAccountByIdAndRole", accountId, role],
    queryFn: async () => {
      if (!accountId || !role) throw new Error("Thiếu thông tin đăng nhập");
      const response = await axiosInstance.get<CustomerProfileDto[]>(
        `${accountId}/${role}`
      );
      return response.data;
    },
    enabled: !!accountId && !!role, // Chỉ gọi API khi có accountId và role
  });
};
