import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserDto } from "../dto/get-user.dto";

const fetchUsers = async (): Promise<UserDto[]> => {
  const response = await axios.get<UserDto[]>(
    "https://localhost:7071/getAllAccounts"
  );
  return response.data;
};

export const useUsers = () => {
  return useQuery<UserDto[], Error>({
    queryKey: ["getAllAccounts"],
    queryFn: fetchUsers,
  });
};
