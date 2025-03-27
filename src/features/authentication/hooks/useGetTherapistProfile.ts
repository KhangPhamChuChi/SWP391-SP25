import { useQuery } from "@tanstack/react-query";
import { SkintherapistProfileDto } from "../dto/profile.dto";
import axiosInstance from "../../../axios";

export const useGetTherapistProfile = (accountId?: number, role?: string) => {
  return useQuery({
    queryKey: ["getAccountByIdAndRole", accountId, role],
    queryFn: async () => {
      if (!accountId || !role) throw new Error("Thiếu thông tin đăng nhập");
      const response = await axiosInstance.get<SkintherapistProfileDto[]>(
        `getAccountByIdAndRole/${accountId}/${role}`
      );
      return response.data;
    },
    enabled: !!accountId && !!role,
  });
};
