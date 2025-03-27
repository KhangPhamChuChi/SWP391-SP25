import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SkinDto } from "../dto/skin.dto";
import axiosInstance from "../../../axios";

interface MutationVariables {
  skintypeId: string;
  data: SkinDto;
}

export const useUpdateSkin = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MutationVariables>({
    mutationFn: async ({
      skintypeId,
      data,
    }: MutationVariables): Promise<void> => {
      await axiosInstance.put(
        `api/skintype/updateSkintype/${skintypeId}`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateSkintype"] });
    },
  });
};
