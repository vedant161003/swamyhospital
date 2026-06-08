import { useState } from "react";
import { z } from "zod";
import { Calendar, Clock, Stethoscope, User, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { submitBooking } from "@/lib/submitBooking";

const detailsSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255),
  area: z.string().trim().min(1, "Please enter your area").max(100),
  message: z.string().trim().max(500).optional(),
});

const SERVICES = [
  "Skin Care / Dermatology / Cosmetology",
  "General Medicine",
  "OBG (Obstetrics & Gynecology)",
  "Wound Care",
];

function getDateOptions() {
  const today = new Date();
  return [0, 1, 2].map((offset) => {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    const label = offset === 0 ? "Today" : offset === 1 ? "Tomorrow" : "Day After Tomorrow";
    return {
      label,
      iso: d.toISOString().split("T")[0],
      display: d.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
    };
  });
}

function getTimeSlots() {
  // 10:00 AM → 10:00 PM, 30-min intervals
  const slots: string[] = [];
  for (let h = 10; h <= 22; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 22 && m > 0) break;
      const hh = ((h + 11) % 12) + 1;
      const ampm = h < 12 ? "AM" : "PM";
      slots.push(`${hh}:${m === 0 ? "00" : "30"} ${ampm}`);
    }
  }
  return slots;
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function BookingDialog({ open, onOpenChange }: Props) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<{ iso: string; display: string } | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [service, setService] = useState<string | null>(null);
  const [details, setDetails] = useState({ name: "", phone: "", email: "", area: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const reset = () => {
    setStep(1);
    setDate(null);
    setTime(null);
    setService(null);
    setDetails({ name: "", phone: "", email: "", area: "", message: "" });
    setDone(false);
  };

  const handleClose = (next: boolean) => {
    if (!next) setTimeout(reset, 200);
    onOpenChange(next);
  };

  const handleConfirm = async () => {
    if (!date || !time || !service) {
      toast.error("Please complete all booking steps");
      return;
    }
    const parsed = detailsSchema.safeParse(details);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    try {
      await submitBooking({
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        service,
        date: date.display,
        time,
        message: [`Area: ${parsed.data.area}`, parsed.data.message]
          .filter(Boolean)
          .join(" | "),
      });
      setDone(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const dates = getDateOptions();
  const slots = getTimeSlots();

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {done ? (
          <div className="py-10 text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-accent" />
            <h3 className="mt-4 text-2xl font-semibold">Booking Confirmed!</h3>
            <p className="mt-2 text-muted-foreground">
              Your slot has been booked! We will contact you shortly.
            </p>
            <div className="mt-6 rounded-lg bg-secondary p-4 text-left text-sm">
              <p><strong>Service:</strong> {service}</p>
              <p><strong>Date:</strong> {date?.display}</p>
              <p><strong>Time:</strong> {time}</p>
              <p><strong>Name:</strong> {details.name}</p>
            </div>
            <Button className="mt-6" onClick={() => handleClose(false)}>Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Book Your Slot — Step {step} of 4</DialogTitle>
              <DialogDescription>
                {step === 1 && "Choose a date for your visit"}
                {step === 2 && "Choose a time slot"}
                {step === 3 && "Choose a service"}
                {step === 4 && "Enter your details"}
              </DialogDescription>
            </DialogHeader>

            <Stepper step={step} />

            {step === 1 && (
              <div className="grid gap-3 sm:grid-cols-3">
                {dates.map((d) => (
                  <button
                    key={d.iso}
                    onClick={() => {
                      setDate(d);
                      setStep(2);
                    }}
                    className={cn(
                      "rounded-xl border-2 p-4 text-left transition-all hover:border-primary hover:shadow-md",
                      date?.iso === d.iso ? "border-primary bg-secondary" : "border-border",
                    )}
                  >
                    <Calendar className="mb-2 h-5 w-5 text-primary" />
                    <p className="font-semibold">{d.label}</p>
                    <p className="text-sm text-muted-foreground">{d.display}</p>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {slots.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setTime(s);
                      setStep(3);
                    }}
                    className={cn(
                      "flex items-center justify-center gap-1 rounded-lg border-2 px-2 py-2 text-sm transition-all hover:border-primary",
                      time === s ? "border-primary bg-secondary" : "border-border",
                    )}
                  >
                    <Clock className="h-3 w-3" /> {s}
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-3">
                {SERVICES.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setService(s);
                      setStep(4);
                    }}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all hover:border-primary",
                      service === s ? "border-primary bg-secondary" : "border-border",
                    )}
                  >
                    <Stethoscope className="h-5 w-5 text-primary" />
                    <span className="font-medium">{s}</span>
                  </button>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="grid gap-4">
                <div className="rounded-lg bg-secondary p-3 text-sm">
                  <p><strong>{service}</strong></p>
                  <p className="text-muted-foreground">{date?.display} · {time}</p>
                </div>
                <div className="grid gap-2">
                  <Label>Full Name</Label>
                  <Input
                    value={details.name}
                    onChange={(e) => setDetails({ ...details, name: e.target.value })}
                    placeholder="John Doe"
                    maxLength={100}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Phone Number</Label>
                  <Input
                    type="tel"
                    inputMode="numeric"
                    value={details.phone}
                    onChange={(e) =>
                      setDetails({ ...details, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })
                    }
                    placeholder="10-digit mobile number"
                    maxLength={10}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Email ID</Label>
                  <Input
                    type="email"
                    value={details.email}
                    onChange={(e) => setDetails({ ...details, email: e.target.value })}
                    placeholder="you@example.com"
                    maxLength={255}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Area / Locality</Label>
                  <Input
                    value={details.area}
                    onChange={(e) => setDetails({ ...details, area: e.target.value })}
                    placeholder="e.g. Electronic City Phase 1"
                    maxLength={100}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Message / Notes <span className="text-muted-foreground text-xs">(optional)</span></Label>
                  <Textarea
                    value={details.message}
                    onChange={(e) => setDetails({ ...details, message: e.target.value })}
                    placeholder="Any specific concerns or notes for the doctor"
                    maxLength={500}
                    rows={3}
                  />
                </div>
                <Button
                  variant="cta"
                  size="lg"
                  onClick={handleConfirm}
                  disabled={submitting}
                  className="mt-2"
                >
                  {submitting ? "Confirming..." : "Confirm Booking"}
                </Button>
              </div>
            )}

            {step > 1 && (
              <div className="flex justify-start">
                <Button variant="ghost" size="sm" onClick={() => setStep(step - 1)}>
                  ← Back
                </Button>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          className={cn(
            "h-1.5 flex-1 rounded-full transition-colors",
            n <= step ? "bg-primary" : "bg-border",
          )}
        />
      ))}
    </div>
  );
}
