import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../axios";

export interface ResetPasswordDto {
  email: string;
  otp: string;
  newPassword: string;
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (resetPassword: ResetPasswordDto) => {
      const response = await axiosInstance.post(
        `api/auth/resetPassword`,
        resetPassword
      );
      return response.data;
    },
  });
};
