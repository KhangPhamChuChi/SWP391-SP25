import { useQuery } from "@tanstack/react-query";
import { BookingDto } from "../dto/booking.dto";
import axiosInstance from "../../../axios";

const fetchBookings = async (bookingStatus: string): Promise<BookingDto[]> => {
  const response = await axiosInstance.get<BookingDto[]>(
    `api/Booking/booked/${bookingStatus}`
  );
  return response.data;
};

export const useBookings = (bookingStatus: string) => {
  return useQuery<BookingDto[], Error>({
    queryKey: ["getBookings", bookingStatus],
    queryFn: () => fetchBookings(bookingStatus),
  });
};
