import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { AppModalsAndNav } from "@/components/AppModalsAndNav";

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
    <html lang="en">
      <head>
        {/* Leaflet CSS */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        {/* Google Fonts: Inter, JetBrains Mono & Noto Sans Devanagari */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Noto+Sans+Devanagari:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#E2EEFC] text-[#1E293B] min-h-screen antialiased selection:bg-blue-600 selection:text-white">
        <div className="fixed-india-bg" />
        <AppProvider>
          <AppModalsAndNav>{children}</AppModalsAndNav>
        </AppProvider>
      </body>
    </html>
  );
}
