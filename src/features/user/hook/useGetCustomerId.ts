import { useMemo } from "react";
import { useCustomers } from "./useGetCustomer";
import useAuthStore from "../../authentication/hooks/useAuthStore";

export const useGetCustomerId = () => {
  const { user } = useAuthStore();
  const { data: customers, isLoading, error } = useCustomers();

  const customerId = useMemo(() => {
    if (!user || !customers) return null;

    const userAccountId = Number(user?.accountId);
    const customer = customers.find(
      (c) => Number(c.accountId) === userAccountId
    );

    console.log("Matched customer:", customer);
    return customer?.customerId ?? null;
  }, [user, customers]);

  return { customerId, isLoading, error };
};
