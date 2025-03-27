import { useMutation } from "@tanstack/react-query";
import { ScheduleDto } from "../dto/schedule.dto";
import axiosInstance from "../../../axios";

export const useCreateSchedule = () => {
  return useMutation({
    mutationFn: async (newSchedule: ScheduleDto) => {
      const response = await axiosInstance.post(
        `api/Schedule/createSchedule`,
        newSchedule
      );
      return response.data;
    },
  });
};
