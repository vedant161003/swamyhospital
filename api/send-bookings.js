import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const booking = req.body;

  try {
    await resend.emails.send({
      from: "appointments@swamyhospitals.com",
      to: "info@swamyhospitals.com",
      subject: "New Appointment Booking",
      html: `
        <h2>New Appointment</h2>
        <p>Name: ${booking.name}</p>
        <p>Phone: ${booking.phone}</p>
        <p>Email: ${booking.email}</p>
        <p>Service: ${booking.service}</p>
        <p>Date: ${booking.date}</p>
        <p>Time: ${booking.time}</p>
      `,
    });

    await resend.emails.send({
      from: "appointments@swamyhospitals.com",
      to: booking.email,
      subject: "Appointment Confirmation",
      html: `
        <h2>Appointment Confirmed</h2>
        <p>Dear ${booking.name},</p>
        <p>Thank you for booking with Swamy Hospitals.</p>
        <p>We have received your appointment request.</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}