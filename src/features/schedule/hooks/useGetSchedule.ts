import { useQuery } from "@tanstack/react-query";
import { ScheduleDto } from "../dto/schedule.dto";
import axiosInstance from "../../../axios";

const fetchSchedule = async (): Promise<ScheduleDto[]> => {
  const response = await axiosInstance.get<ScheduleDto[]>(
    "api/Schedule/getAll"
  );
  return response.data;
};

export const useSchedule = () => {
  return useQuery<ScheduleDto[], Error>({
    queryKey: ["getAll"],
    queryFn: fetchSchedule,
  });
};
