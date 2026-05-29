import { createContext, useContext, useState, type ReactNode } from "react";
import { BookingDialog } from "./BookingDialog";

const BookingCtx = createContext<{ open: () => void } | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <BookingCtx.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <BookingDialog open={open} onOpenChange={setOpen} />
    </BookingCtx.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingCtx);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
