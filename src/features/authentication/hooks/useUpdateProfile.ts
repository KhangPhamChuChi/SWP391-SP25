import { useQuery } from "@tanstack/react-query";
import { CustomerProfileDto } from "../dto/profile.dto";
import axiosInstance from "../../../axios";

export const useUpdateCustomerProfile = (customerId: number) => {
  return useQuery({
    queryKey: ["getAccountByIdAndRole", customerId],
    queryFn: async () => {
      const response = await axiosInstance.get<CustomerProfileDto[]>(
        `updateCustomer/${customerId}`
      );
      return response.data;
    },
    enabled: !!customerId,
  });
};
