import { useQuery } from "@tanstack/react-query";
import { TherapistDto } from "../dto/get-therapist.dto";
import axiosInstance from "../../../axios";

export const useTherapistById = (skintherapistId: string) => {
  return useQuery<TherapistDto, Error>({
    queryKey: ["getSkintherapistById", skintherapistId],
    queryFn: async () => {
      const response = await axiosInstance.get<TherapistDto>(
        `api/skintherapist/getSkintherapistById/${skintherapistId}`
      );
      return response.data;
    },
    enabled: !!skintherapistId,
  });
};
