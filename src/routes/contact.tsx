import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { submitBooking } from "@/lib/submitBooking";
import { HOSPITAL_INFO } from "@/config/integrations";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Swamy Hospitals" },
      { name: "description", content: "Get in touch with Swamy Hospitals, Electronic City, Bangalore." },
      { property: "og:title", content: "Contact Swamy Hospitals" },
      { property: "og:description", content: "Reach out for appointments and queries." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setSending(true);
    await submitBooking({
      name: form.name,
      phone: form.phone,
      email: form.email,
      service: "Contact Form",
      date: new Date().toLocaleDateString("en-IN"),
      time: new Date().toLocaleTimeString("en-IN"),
      message: form.message,
    });
    setSending(false);
    toast.success("Message sent! We will get back to you shortly.");
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <>
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-bold sm:text-5xl">Contact Us</h1>
          <p className="mt-4 text-muted-foreground">We'd love to hear from you.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div className="space-y-4">
            {[
              { icon: MapPin, title: "Address", value: HOSPITAL_INFO.address },
              { icon: Phone, title: "Phone", value: HOSPITAL_INFO.phone },
              { icon: Mail, title: "Email", value: HOSPITAL_INFO.email },
            ].map((c) => (
              <div key={c.title} className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{c.title}</p>
                  <p className="text-sm text-muted-foreground">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="rounded-xl border border-border bg-card p-6 space-y-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} />
            </div>
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} />
            </div>
            <div className="grid gap-2">
              <Label>Message</Label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                maxLength={1000}
              />
            </div>
            <Button variant="cta" type="submit" disabled={sending} className="w-full">
              {sending ? "Sending..." : <>Send Message <Send className="h-4 w-4" /></>}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
