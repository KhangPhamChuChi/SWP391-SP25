import { useMutation } from "@tanstack/react-query";
import { UserDto } from "../dto/get-user.dto";
import axiosInstance from "../../../axios";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (newUser: UserDto) => {
      const response = await axiosInstance.post(`createAccount`, newUser);
      return response.data;
    },
  });
};
