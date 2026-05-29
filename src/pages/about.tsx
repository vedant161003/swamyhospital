import { Heart, Target, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-bold sm:text-5xl">About Swamy Hospitals</h1>
          <p className="mt-4 text-muted-foreground">
            A trusted name in healthcare for the Electronic City community.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl space-y-6 px-4 text-muted-foreground sm:px-6">
          <p>
            Swamy Hospitals is a full-service nursing home, clinic, and medical center based in Electronic City, Bangalore. For years, we have been delivering compassionate, high-quality healthcare to families across the region.
          </p>
          <p>
            Our team of experienced doctors and dedicated staff combine modern medicine with a personal touch — ensuring every patient receives attentive, individualized care. Whether you visit us for a routine consultation or a specialized treatment, you can expect the same standard of excellence.
          </p>
          <p>
            We offer Dermatology, General Medicine, and OBG services, with a focus on prevention, accurate diagnosis, and effective treatment.
          </p>
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3">
          {[
            {
              icon: Target,
              title: "Our Mission",
              desc: "To deliver accessible, high-quality medical care that improves the well-being of every patient we serve.",
            },
            {
              icon: Heart,
              title: "Our Values",
              desc: "Compassion, integrity, and excellence guide every interaction and every treatment.",
            },
            {
              icon: Sparkles,
              title: "Our Promise",
              desc: "A patient-first approach with experienced doctors, modern facilities, and trusted care.",
            },
          ].map((m) => (
            <div key={m.title} className="rounded-xl border border-border bg-card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <m.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{m.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}