import { useMutation } from "@tanstack/react-query";
import { SkinDto } from "../dto/skin.dto";
import axiosInstance from "../../../axios";

export const useCreateSkin = () => {
  return useMutation({
    mutationFn: async (newSkin: SkinDto) => {
      const response = await axiosInstance.post(
        `api/skintype/createSkintype`,
        newSkin
      );
      return response.data;
    },
  });
};
