import { useQuery } from "@tanstack/react-query";
import { CustomerDto } from "../dto/customer.dto";
import axiosInstance from "../../../axios";

const fetchCustomers = async (): Promise<CustomerDto[]> => {
  const response = await axiosInstance.get<CustomerDto[]>("getAllCustomers");
  return response.data;
};

export const useCustomers = () => {
  return useQuery<CustomerDto[], Error>({
    queryKey: ["getAllCustomers"],
    queryFn: fetchCustomers,
  });
};
