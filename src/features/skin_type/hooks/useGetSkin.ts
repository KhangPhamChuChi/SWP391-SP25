import { useQuery } from "@tanstack/react-query";
import { SkinDto } from "../dto/skin.dto";
import axiosInstance from "../../../axios";

const fetchSkinTypes = async (): Promise<SkinDto[]> => {
  const response = await axiosInstance.get<SkinDto[]>(
    "api/skintype/getAllSkintypes"
  );
  return response.data;
};

export const useSkinTypes = () => {
  return useQuery<SkinDto[], Error>({
    queryKey: ["getAllSkintypes"],
    queryFn: fetchSkinTypes,
  });
};
