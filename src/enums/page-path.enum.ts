export enum PagePath {
  LOGIN = "/Login",
  REGISTER = "/Register",
  VERIFY_EMAIL = "/VerifyEmail",
  VERIFY_OTP = "/VerifyOTP",
  NOT_FOUND = "/404",
  HOME = "/Home",
  WORK_VOLUME = "/Home/Workvolume",
  APPROVAL_VOLUME = "/Home/Approvalvolume",
  USER = "/Home/User",
  USER_DETAIL = "/Home/User/:id",
  PROFILE_DETAIL = "/Home/Profile/:id",
  HOME_PAGE = "/Homepage",
  SHOPPING_PAGE = "/Homepage/Shoppingpage",
  QUIZ = "/Homepage/QuizTest",
  SKIN_SERVICE = "/Homepage/Service",
  SKIN_SERVICE_DETAIL = "/Homepage/Service/:serviceId",
  BLOG = "/Homepage/Blog",
  BLOG_DETAIL = "/Homepage/Blog/:id",
  SKIN_THERAPIST = "/Homepage/SkinTherapist",
  SKIN_THERAPIST_DETAIL = "/Homepage/SkinTherapist/:skintherapistId",
  PRICE_SERVICE = "/Homepage/Price",
  RESULT_COMPLETE = "/Homepage/Complete",
  BOOKING_SERVICE = "/Homepage/BookingService",
  SS_HOME = "/SSHome",
  ANY = "*",
  FORBIDDEN = "/403",
  PROFILE = "/Home/Profile",
  STAFF_PAGE = "/Staff/Appointment",
  SKIN_THERAPIST_PAGE = "/Skin_Therapist/Appointment",
  STAFF_UPDATE_BOOKING = "/Staff/UpdateBooking",
  ROOT = "/",
  // TICKET_MANAGEMENT = "/ticket-management",
  // TIMEKEEPING_DETAIL = "/timekeeping/:code/detail",
  // TIMEKEEPING_MANAGEMENT = "/timekeeping",
  // USER_DETAIL = "/user-management/:id",
  // USER_MANAGEMENT = "/user-management",
}
