import { useMutation } from "@tanstack/react-query";
import { BlogDto } from "../dto/blog.dto";
import axiosInstance from "../../../axios";

export const useCreateBlog = () => {
  return useMutation({
    mutationFn: async (newBlog: BlogDto) => {
      const response = await axiosInstance.post(`createBlog`, newBlog);
      return response.data;
    },
  });
};
