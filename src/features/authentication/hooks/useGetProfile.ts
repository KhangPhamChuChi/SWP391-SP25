import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SkintherapistProfileDto } from "../dto/profile.dto";
import axiosInstance from "../../../axios";

interface MutationVariables {
  accountId: number;
  role: string;
}

export const useGetProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<SkintherapistProfileDto, Error, MutationVariables>({
    mutationFn: async ({
      accountId,
      role,
    }: MutationVariables): Promise<SkintherapistProfileDto> => {
      const response = await axiosInstance.get<SkintherapistProfileDto>(
        `getAccountByIdAndRole/${accountId}/${role}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAccountByIdAndRole"] });
    },
  });
};
