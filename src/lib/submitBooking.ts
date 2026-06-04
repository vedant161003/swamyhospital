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
    console.error(error);
    throw error;
  }

  // Send emails
  await fetch("/api/send-booking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}