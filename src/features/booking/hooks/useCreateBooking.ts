import { useMutation } from "@tanstack/react-query";
import { CreateBookingDto } from "../dto/create-booking.dto";
import axiosInstance from "../../../axios";

interface BookingResponse {
  message: string;
}

export const useCreateBooking = () => {
  const mutation = useMutation<BookingResponse, Error, CreateBookingDto>({
    mutationFn: async (createBooking: CreateBookingDto) => {
      if (!createBooking.slotId) {
        throw new Error("Slot ID is required!");
      }

      const response = await axiosInstance.post<BookingResponse>(
        `api/Booking/create-booking?slotId=${createBooking.slotId}`,
        createBooking,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    },
  });
  return mutation;
};
