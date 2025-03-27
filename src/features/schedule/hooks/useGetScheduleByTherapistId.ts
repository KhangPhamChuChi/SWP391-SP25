import { useQuery } from "@tanstack/react-query";
import { ScheduleDto } from "../dto/schedule.dto";
import axiosInstance from "../../../axios";

export const useGetScheduleByTherapistId = (skintherapistId: number) => {
  return useQuery<ScheduleDto, Error>({
    queryKey: ["search-by-skintherapist", skintherapistId],
    queryFn: async () => {
      const response = await axiosInstance.get<ScheduleDto>(
        `search-by-skintherapist/${skintherapistId}`
      );
      return response.data;
    },
    enabled: !!skintherapistId,
  });
};
