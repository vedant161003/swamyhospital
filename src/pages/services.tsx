import { Sparkles, Activity, Baby, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/components/BookingProvider";

const services = [
  {
    icon: Sparkles,
    title: "Skin Care / Dermatology / Cosmetology",
    desc: "Comprehensive dermatology and cosmetology services — from acne and pigmentation treatment to advanced aesthetic procedures.",
    points: [
      "Acne & pigmentation care",
      "Anti-ageing treatments",
      "Hair & scalp care",
      "Cosmetic dermatology",
    ],
  },
  {
    icon: Activity,
    title: "General Medicine",
    desc: "Expert diagnosis and treatment for a wide range of medical conditions, with a focus on preventive and ongoing care.",
    points: [
      "Routine check-ups",
      "Chronic disease management",
      "Fever & infections",
      "Lifestyle counselling",
    ],
  },
  {
    icon: Baby,
    title: "OBG (Obstetrics & Gynecology)",
    desc: "Holistic women's healthcare — from regular gynecology consults to pregnancy and postnatal care.",
    points: [
      "Pregnancy care",
      "Gynec consultations",
      "Menstrual health",
      "Postnatal support",
    ],
  },
];

export default function ServicesPage() {
  const { open } = useBooking();
  return (
    <>
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-bold sm:text-5xl">Our Services</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Quality medical care across multiple specialties — delivered by experienced doctors at Swamy Hospitals.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-xl font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent shrink-0" /> {p}
                  </li>
                ))}
              </ul>
              <Button variant="cta" className="mt-6" onClick={open}>Book Your Slot</Button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
