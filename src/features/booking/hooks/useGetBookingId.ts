import { useQuery } from "@tanstack/react-query";
import { BookingDto } from "../dto/booking.dto";
import axiosInstance from "../../../axios";

export const useBookingById = (bookingId: string) => {
  return useQuery<BookingDto, Error>({
    queryKey: ["getBookingById", bookingId],
    queryFn: async () => {
      const response = await axiosInstance.get<BookingDto>(
        `api/Booking/getBookingById/${bookingId}`
      );
      return response.data;
    },
    enabled: !!bookingId,
  });
};
