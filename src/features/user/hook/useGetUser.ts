import { useQuery } from "@tanstack/react-query";
import { UserDto } from "../dto/get-user.dto";
import axiosInstance from "../../../axios";

const fetchUsers = async (): Promise<UserDto[]> => {
  const response = await axiosInstance.get<UserDto[]>("getAllAccounts");
  return response.data;
};

export const useUsers = () => {
  return useQuery<UserDto[], Error>({
    queryKey: ["getAllAccounts"],
    queryFn: fetchUsers,
  });
};
