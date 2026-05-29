import { supabase } from "@/integrations/supabase/client";

export type BookingPayload = {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  message?: string;
};

/**
 * Saves a booking to Lovable Cloud (Supabase `bookings` table).
 * View all submissions in the Cloud dashboard under the Database tab.
 */
export async function submitBooking(payload: BookingPayload) {
  const { error } = await supabase.from("bookings").insert({
    name: payload.name,
    phone: payload.phone,
    email: payload.email,
    service: payload.service,
    booking_date: payload.date,
    booking_time: payload.time,
    message: payload.message ?? null,
  });
  if (error) {
    console.error("Booking submission failed:", error);
    throw error;
  }
}
