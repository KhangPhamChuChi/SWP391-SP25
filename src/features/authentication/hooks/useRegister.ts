import { useMutation } from "@tanstack/react-query";
import { RegisterDto } from "../dto/register.dto";
import axiosInstance from "../../../axios";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (newAccount: RegisterDto) => {
      const response = await axiosInstance.post(
        `api/auth/register`,
        newAccount
      );
      return response.data;
    },
  });
};
