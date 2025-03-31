import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../axios";
import { TherapistDto } from "../dto/get-therapist.dto";

export const useCreateTherapist = () => {
  return useMutation({
    mutationFn: async (newTherapist: TherapistDto) => {
      const response = await axiosInstance.post(
        `api/skintherapist/addSkinTherapist`,
        newTherapist
      );
      return response.data;
    },
  });
};
