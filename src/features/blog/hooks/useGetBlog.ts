import { useQuery } from "@tanstack/react-query";
import { BlogDto } from "../dto/blog.dto";
import axiosInstance from "../../../axios";

const fetchBlogs = async (): Promise<BlogDto[]> => {
  const response = await axiosInstance.get<BlogDto[]>("getAllBlogs");
  return response.data;
};

export const useBlogs = () => {
  return useQuery<BlogDto[], Error>({
    queryKey: ["getAllBlogs"],
    queryFn: fetchBlogs,
  });
};
