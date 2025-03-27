import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../axios";

export interface VerifyOTPDto {
  email: string;
  otp: string;
}

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: async (verifyOTP: VerifyOTPDto) => {
      const response = await axiosInstance.post(
        `api/auth/verifyOtp`,
        verifyOTP
      );
      return response.data;
    },
  });
};
