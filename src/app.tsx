import { Routes, Route } from "react-router-dom";

import Home from "./pages/index";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import ServicesPage from "./pages/services";
import LocationPage from "./pages/location";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/location" element={<LocationPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}