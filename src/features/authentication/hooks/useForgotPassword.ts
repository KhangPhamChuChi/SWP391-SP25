import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../axios";

export interface ForgorPasswordDto {
  email: string;
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (verifyAccount: ForgorPasswordDto) => {
      const response = await axiosInstance.post(
        `api/auth/forgotPassword`,
        verifyAccount
      );
      return response.data;
    },
  });
};
