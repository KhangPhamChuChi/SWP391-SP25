import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CustomerDto } from "../dto/customer.dto";

// 🛠 Hook cập nhật khách hàng
export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (customer: CustomerDto): Promise<CustomerDto> => {
      if (!customer || !customer.customerId) {
        throw new Error("⚠ Thiếu thông tin khách hàng");
      }

      console.log("📡 Gửi yêu cầu cập nhật khách hàng:", customer);

      try {
        const response = await axios.put<CustomerDto>(
          `https://localhost:7071/updateCustomer/${customer.customerId}`,
          customer,
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("✅ Cập nhật thành công:", response.data);
        return response.data;
      } catch (error) {
        console.error("❌ Lỗi khi cập nhật khách hàng:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log(
        "🔄 Invalidate dữ liệu khách hàng sau khi cập nhật:",
        data.customerId
      );

      // ✅ Cách gọi invalidateQueries đúng
      queryClient.invalidateQueries({
        queryKey: ["getCustomerById", data.customerId],
      });
    },
    onError: (error) => {
      console.error("⚠ Lỗi khi cập nhật:", error);
    },
  });
};
