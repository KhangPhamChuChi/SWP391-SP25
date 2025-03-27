import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CustomerProfileDto } from "../dto/profile.dto";

export const useUpdateCustomerProfile = (customerId: number) => {
  return useQuery({
    queryKey: ["getAccountByIdAndRole", customerId],
    queryFn: async () => {
      const response = await axios.get<CustomerProfileDto[]>(
        `https://localhost:7071/updateCustomer/${customerId}`
      );
      return response.data;
    },
    enabled: !!customerId,
  });
};
