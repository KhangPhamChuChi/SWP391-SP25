import { useQuery } from "@tanstack/react-query";
import { BlogDto } from "../dto/blog.dto";
import axiosInstance from "../../../axios";

export const useBlogById = (blogId: string) => {
  return useQuery<BlogDto, Error>({
    queryKey: ["getBookingById", blogId],
    queryFn: async () => {
      const response = await axiosInstance.get<BlogDto>(
        `getBlogById/${blogId}`
      );
      return response.data;
    },
    enabled: !!blogId,
  });
};
