import { Link } from "react-router-dom";
import {
  Award,
  Stethoscope,
  Users,
  ShieldCheck,
  Sparkles,
  Baby,
  Activity,
  ArrowRight,
  HeartPulse,
  Scan,
  FlaskConical,
  ClipboardCheck,
  BedDouble,
  Scissors,
  Stethoscope as StethIcon,
  Pill,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useBooking } from "@/components/BookingProvider";
import heroImage from "@/assets/hero-hospital.jpg";

export default function Home() {
  const { open } = useBooking();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" /> Electronic City, Bangalore
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Your Health, <span className="text-primary">Our Priority</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Compassionate, expert care from Swamy Hospitals — a trusted medical care hospital, and medical center serving Electronic City and beyond.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="cta" size="lg" onClick={open}>
                Book Your Slot <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
            <img
              src={heroImage}
              alt="Swamy Hospitals reception and care environment"
              width={1600}
              height={900}
              className="relative rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Why Choose Swamy Hospitals?</h2>
            <p className="mt-3 text-muted-foreground">Trusted care, every step of the way.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Award, title: "Best in Electronic City", desc: "Recognized as a leading hospital in Electronic City, Bangalore." },
              { icon: Stethoscope, title: "Medical care Hospital", desc: "Medical care Hospital, and medical services under one roof." },
              { icon: Users, title: "Experienced Doctors", desc: "Highly qualified specialists with years of clinical experience." },
              { icon: ShieldCheck, title: "Trusted Care", desc: "Hygienic facilities and patient-first care you can rely on." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">Our Services</h2>
              <p className="mt-2 text-muted-foreground">Comprehensive care across specialties.</p>
            </div>
            <Link to="/services" className="text-sm font-medium text-primary hover:underline">
              View all →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { icon: Sparkles, title: "Skin Care / Dermatology / Cosmetology", desc: "Advanced skin treatments, dermatology consultations, and aesthetic care." },
              { icon: Activity, title: "General Medicine", desc: "Diagnosis and treatment for a wide range of medical conditions." },
              { icon: Baby, title: "OBG", desc: "Obstetrics and gynecology care for women at every stage of life." },
            ].map((s) => (
              <div key={s.title} className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="inline-block rounded-md bg-primary-foreground/95 px-6 py-2 text-2xl font-bold tracking-wide text-primary sm:text-3xl">
              FACILITIES
            </h2>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [
                { icon: HeartPulse, label: "ECG" },
                { icon: Scan, label: "X-Ray" },
                { icon: FlaskConical, label: "Laboratory" },
              ],
              [
                { icon: StethIcon, label: "Consultation" },
                { icon: BedDouble, label: "Admission" },
                { icon: Scissors, label: "Surgery" },
              ],
              [
                { icon: ClipboardCheck, label: "ANC (Monthly Checkup)" },
                { icon: Baby, label: "Delivery" },
                { icon: Pill, label: "Pharmacy" },
              ],
            ].map((col, i) => (
              <div
                key={i}
                className="space-y-4 border-primary-foreground/20 lg:[&:not(:last-child)]:border-r lg:[&:not(:last-child)]:pr-6"
              >
                {col.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <item.icon className="h-7 w-7 shrink-0 opacity-90" />
                    <span className="text-xl font-bold uppercase tracking-wide">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AESTHETIC CARE */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
              AESTHETIC CARE
            </h2>
            <p className="mt-3 text-muted-foreground">
              Advanced skin & hair treatments with proven results.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Skin",
                items: ["Acne Treatment", "Anti-ageing", "Pigmentation", "Glowing Skin"],
              },
              {
                title: "Hair",
                items: [
                  "Hair PRP / GFC (Growth Factor Concentrate)",
                  "Hair Growth",
                  "Laser Hair Removal",
                  "Dandruff Treatment",
                ],
              },
            ].map((group) => (
              <div
                key={group.title}
                className="rounded-2xl bg-primary p-8 text-primary-foreground shadow-lg"
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-4 py-1.5 text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-lg font-bold">{group.title}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {group.items.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-lg font-semibold">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-primary-foreground">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">About Swamy Hospitals</h2>
            <p className="mt-4 text-muted-foreground">
              Swamy Hospitals is a trusted medical care hospital, and medical center in Electronic City, Bangalore. We combine experienced doctors, modern facilities, and a patient-first approach to deliver the highest standard of care.
            </p>
            <p className="mt-3 text-muted-foreground">
              From everyday medical needs to specialized treatments, our team is committed to your well-being.
            </p>
            <Button asChild className="mt-6" variant="outline">
              <Link to="/about">Learn more about us</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "Since", l: "1999" },
              { n: "20+", l: "Specialists" },
              { n: "10k+", l: "Happy Patients" },
              { n: "10+", l: "Years of Care" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-border bg-card p-6 text-center">
                <p className="text-3xl font-bold text-primary">{s.n}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl rounded-2xl bg-gradient-to-br from-primary to-primary/80 px-6 py-12 text-center text-primary-foreground sm:px-12">
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to book your appointment?</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-90">
            Reserve a slot with our specialists in just a few clicks.
          </p>
          <Button variant="cta" size="lg" className="mt-6" onClick={open}>
            Book Your Slot
          </Button>
        </div>
      </section>
    </>
  );
}
