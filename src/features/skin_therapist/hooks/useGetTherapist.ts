import { useQuery } from "@tanstack/react-query";
import { TherapistDto } from "../dto/get-therapist.dto";
import axiosInstance from "../../../axios";

const fetchTherapists = async (): Promise<TherapistDto[]> => {
  const response = await axiosInstance.get<TherapistDto[]>(
    "api/skintherapist/getAllSkintherapist"
  );
  return response.data;
};

export const useTherapists = () => {
  return useQuery<TherapistDto[], Error>({
    queryKey: ["getAllSkintherapist"],
    queryFn: fetchTherapists,
  });
};
