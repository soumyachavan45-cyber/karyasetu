import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { ToastContainer } from "@/components/ToastContainer";
import { JobBookingModal } from "@/components/JobBookingModal";
import { VoiceAssistantModal } from "@/components/VoiceAssistantModal";
import { PricingMatrixModal } from "@/components/PricingMatrixModal";
import { BottomNav } from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "KaryaSetu 🇮🇳 | कार्यसेतु - Connecting Artisans Directly to Households",
  description:
    "A decentralized, state-backed, cooperative-owned digital public marketplace that formalizes India's blue-collar workforce with 92% direct payouts and automated e-Shram social security.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
      <body className="bg-transparent text-slate-900 min-h-screen antialiased">
        <AppProvider>
          {/* Full-Screen Fixed India Map Atmospheric Background */}
          <div className="fixed-india-bg" aria-hidden="true" />
          
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <BottomNav />
          <ToastContainer />
          <JobBookingModal />
          <VoiceAssistantModal />
          <PricingMatrixModal />
        </AppProvider>
      </body>

    </html>
  );
}

