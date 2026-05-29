import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { HOSPITAL_INFO } from "@/config/integrations";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Location — Swamy Hospitals, Electronic City Bangalore" },
      { name: "description", content: "Find Swamy Hospitals in Electronic City, Bangalore. Address, map, and contact details." },
      { property: "og:title", content: "Visit Swamy Hospitals" },
      { property: "og:description", content: "Located in Electronic City, Bangalore." },
    ],
  }),
  component: LocationPage,
});

function LocationPage() {
  return (
    <>
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-bold sm:text-5xl">Visit Us</h1>
          <p className="mt-4 text-muted-foreground">
            Conveniently located in Electronic City, Bangalore.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-5">
          <div className="md:col-span-2 space-y-4">
            {[
              { icon: MapPin, title: "Address", value: HOSPITAL_INFO.address },
              { icon: Phone, title: "Phone", value: HOSPITAL_INFO.phone },
              { icon: Mail, title: "Email", value: HOSPITAL_INFO.email },
              { icon: Clock, title: "Hours", value: "Mon – Sun: 10:00 AM – 10:00 PM" },
            ].map((c) => (
              <div key={c.title} className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{c.title}</p>
                  <p className="text-sm text-muted-foreground">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="md:col-span-3 overflow-hidden rounded-xl border border-border bg-card">
            {/* Replace src in src/config/integrations.ts with your actual Google Maps embed URL */}
            <iframe
              title="Swamy Hospitals location"
              src={HOSPITAL_INFO.mapEmbedUrl}
              className="h-[400px] w-full md:h-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
