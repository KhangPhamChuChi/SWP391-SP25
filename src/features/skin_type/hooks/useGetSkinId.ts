import { useQuery } from "@tanstack/react-query";
import { SkinDto } from "../dto/skin.dto";
import axiosInstance from "../../../axios";

const fetchSkinTypeById = async (id: number): Promise<SkinDto> => {
  const response = await axiosInstance.get<SkinDto>(
    `api/skintype/getSkintypeById/${id}`
  );
  return response.data;
};

export const useSkinTypeById = (id: number) => {
  return useQuery<SkinDto, Error>({
    queryKey: ["getSkintypeById", id],
    queryFn: () => fetchSkinTypeById(id),
    enabled: !!id,
  });
};
