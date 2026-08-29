import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { ToastContainer } from "@/components/ToastContainer";
import { JobBookingModal } from "@/components/JobBookingModal";
import { PhysicalJobTicketModal } from "@/components/PhysicalJobTicketModal";
import { VoiceAssistantModal } from "@/components/VoiceAssistantModal";
import { PricingMatrixModal } from "@/components/PricingMatrixModal";

export const metadata: Metadata = {
  title: "KaryaSetu 🇮🇳 | कार्यसेतु - India's Sovereign Cooperative Workforce Platform",
  description:
    "A decentralized, state-backed, cooperative-owned digital public marketplace that formalizes India's blue-collar workforce with 92% direct payouts and automated e-Shram social security.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Leaflet CSS */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        {/* Google Fonts: Inter & Noto Sans Devanagari */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Noto+Sans+Devanagari:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0B0B0C] text-zinc-100 min-h-screen antialiased">
        <AppProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <ToastContainer />
          <JobBookingModal />
          <PhysicalJobTicketModal />
          <VoiceAssistantModal />
          <PricingMatrixModal />
        </AppProvider>
      </body>
    </html>
  );
}
