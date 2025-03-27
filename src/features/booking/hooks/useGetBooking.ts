import { useQuery } from "@tanstack/react-query";
import { BookingDto } from "../dto/booking.dto";
import axiosInstance from "../../../axios";

const fetchBookings = async (): Promise<BookingDto[]> => {
  const response = await axiosInstance.get<BookingDto[]>(
    "api/Booking/getAllBookings"
  );
  return response.data;
};

export const useBookingss = () => {
  return useQuery<BookingDto[], Error>({
    queryKey: ["getAllBookings"],
    queryFn: fetchBookings,
  });
};
