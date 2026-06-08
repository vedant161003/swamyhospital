import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "./BookingProvider";
import { cn } from "@/lib/utils";
import logo from "@/assets/swamy-logo.png";

const services = [
  { label: "Skin Care / Dermatology / Cosmetology", to: "/services" },
  { label: "General Medicine", to: "/services" },
  { label: "OBG (Obstetrics & Gynecology)", to: "/services" },
  { label: "Wound Care", to: "/services" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { open } = useBooking();

  const linkClass =
    "text-sm font-medium text-foreground/80 hover:text-primary transition-colors";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Swamy Hospital" className="h-10 w-auto rounded-md object-contain" />
          <span className="sr-only">Swamy Hospitals</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <Link to="/" className={linkClass}>Home</Link>
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link to="/services" className={cn(linkClass, "flex items-center gap-1")}>
              Services <ChevronDown className="h-3.5 w-3.5" />
            </Link>
            {servicesOpen && (
              <div className="absolute left-0 top-full w-72 pt-2">
                <div className="rounded-lg border border-border bg-card p-2 shadow-lg">
                  {services.map((s) => (
                    <Link
                      key={s.label}
                      to={s.to}
                      className="block rounded-md px-3 py-2 text-sm hover:bg-secondary"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link to="/about" className={linkClass}>About Us</Link>
          <Link to="/location" className={linkClass}>Location</Link>
          <Link to="/contact" className={linkClass}>Contact Us</Link>
        </nav>

        <div className="hidden lg:block">
          <Button variant="cta" onClick={open}>Book Your Slot</Button>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {[
              { to: "/", label: "Home" },
              { to: "/services", label: "Services" },
              { to: "/about", label: "About Us" },
              { to: "/location", label: "Location" },
              { to: "/contact", label: "Contact Us" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <Button
              variant="cta"
              className="mt-2"
              onClick={() => {
                setMobileOpen(false);
                open();
              }}
            >
              Book Your Slot
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
