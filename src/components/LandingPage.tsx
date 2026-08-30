"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { KaryaSetuLogo } from "@/components/KaryaSetuLogo";
import {
  ShieldCheck,
  Sparkles,
  MapPin,
  CheckCircle2,
  Users,
  Star,
  Globe,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  HeartHandshake,
  BadgeIndianRupee,
  Layers,
  Phone,
  Home,
  Briefcase,
} from "lucide-react";
import { INDIA_CITIES, MOCK_WORKERS } from "@/data/mockData";

export const LandingPage: React.FC<{
  onGetStarted: () => void;
  onLogin: () => void;
}> = ({ onGetStarted, onLogin }) => {
  const {
    setActiveTab,
    loginUser,
    language,
    setLanguage,
    selectedCity,
    setSelectedCity,
    setIsPricingModalOpen,
  } = useApp();

  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const handleSelectRole = (role: "worker" | "consumer") => {
    if (role === "worker") {
      loginUser("artisan");
      setActiveTab("worker");
    } else {
      loginUser("citizen");
      setActiveTab("customer");
    }
    onGetStarted();
  };

  // 3 Testimonials from reference image
  const testimonials = [
    {
      name: "Vidya",
      state: "Maharashtra",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
      quote: "KaryaSetu has changed my life. I earn better and feel respected.",
      role: "SHG Artisan",
    },
    {
      name: "Rajesh",
      state: "Uttar Pradesh",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
      quote: "I have job security and fair pay now. It's been a blessing!",
      role: "Master Electrician",
    },
    {
      name: "Latha",
      state: "Tamil Nadu",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
      quote: "Through KaryaSetu, I can support my family with pride.",
      role: "Organic Milk Lead",
    },
  ];

  // Key city pins for the India Map section
  const mapPins = [
    { name: "Delhi NCR", state: "Delhi", top: "28%", left: "42%", count: "4,200+ Artisans" },
    { name: "Jaipur", state: "Rajasthan", top: "34%", left: "33%", count: "1,850+ Artisans" },
    { name: "Lucknow", state: "Uttar Pradesh", top: "33%", left: "54%", count: "2,300+ Artisans" },
    { name: "Patna", state: "Bihar", top: "38%", left: "67%", count: "1,680+ Artisans" },
    { name: "Guwahati", state: "Assam", top: "34%", left: "84%", count: "940+ Artisans" },
    { name: "Kolkata", state: "West Bengal", top: "46%", left: "74%", count: "3,400+ Artisans" },
    { name: "Ahmedabad", state: "Gujarat", top: "43%", left: "26%", count: "2,100+ Artisans" },
    { name: "Mumbai", state: "Maharashtra", top: "54%", left: "28%", count: "2,840+ Artisans" },
    { name: "Pune", state: "Maharashtra", region: "West", top: "59%", left: "32%", count: "1,950+ Artisans" },
    { name: "Hyderabad", state: "Telangana", top: "62%", left: "47%", count: "2,950+ Artisans" },
    { name: "Bengaluru", state: "Karnataka", top: "72%", left: "40%", count: "3,900+ Artisans" },
    { name: "Chennai", state: "Tamil Nadu", top: "74%", left: "50%", count: "3,100+ Artisans" },
    { name: "Kochi", state: "Kerala", top: "82%", left: "38%", count: "1,250+ Artisans" },
  ];

  return (
    <div className="w-full min-h-screen bg-transparent text-slate-900 relative overflow-hidden font-sans">
      {/* Atmosphere Sky & Cloud Elements matching reference image */}

      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-sky-300/30 to-transparent" />
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white/60 blur-3xl" />
        <div className="absolute top-36 right-20 w-96 h-96 rounded-full bg-sky-200/50 blur-3xl" />
        {/* Soft horizon trees silhouette at mid-page */}
        <div className="absolute top-[480px] left-0 right-0 h-48 bg-gradient-to-t from-sky-200/20 via-sky-100/10 to-transparent" />
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-16 flex flex-col items-center text-center">
        
        {/* 1. HERO TITLE BLOCK */}
        <div className="space-y-3 mt-4 sm:mt-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-blue-200/80 shadow-xs text-xs font-bold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sovereign Digital Public Rail for India's Artisans</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
            Connecting Artisans Directly to{" "}
            <span className="text-[#E67E22] drop-shadow-xs">Households</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-700 max-w-xl mx-auto">
            Empowering India's Local Workforce with Fair Minimum Wage Baselines and Social Security.
          </p>
        </div>

        {/* 2. DUAL ROLE SELECTION GLASSMORPHIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-xl mt-8 sm:mt-10">
          {/* Card 1: Worker */}
          <div className="glass-panel p-5 sm:p-6 rounded-3xl flex flex-col items-center text-center space-y-4 hover:shadow-glass-hover transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100/90 border border-amber-300/80 flex items-center justify-center text-2xl shadow-sm">
                👷
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                I'm a Worker
              </h2>
            </div>

            <p className="text-xs text-slate-700 font-medium leading-relaxed px-2">
              Receive direct neighborhood job requests, instant 92% UPI payouts, and automated e-Shram accident & pension security.
            </p>

            <button
              onClick={() => handleSelectRole("worker")}
              className="w-full py-3 rounded-2xl text-xs sm:text-sm font-bold btn-glossy-green flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 shadow-md"
            >
              <span>Find Work</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Consumer */}
          <div className="glass-panel p-5 sm:p-6 rounded-3xl flex flex-col items-center text-center space-y-4 hover:shadow-glass-hover transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100/90 border border-blue-300/80 flex items-center justify-center text-2xl shadow-sm">
                🏡
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                I'm a Consumer
              </h2>
            </div>

            <p className="text-xs text-slate-700 font-medium leading-relaxed px-2">
              Book verified local electricians, plumbers, Vedic pandits, fresh farm dairy, and handicrafts with zero surge prices.
            </p>

            <button
              onClick={() => handleSelectRole("consumer")}
              className="w-full py-3 rounded-2xl text-xs sm:text-sm font-bold btn-glossy-blue flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 shadow-md"
            >
              <span>Hire Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3. INDIA MAP PRESENCE SECTION */}
        <div className="w-full max-w-2xl mt-12 sm:mt-16 space-y-3">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Our Presence Across <span className="text-[#E67E22]">India</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold">
              Click any city pin below to instantly filter local artisan networks
            </p>
          </div>

          {/* Interactive Map Visual Backdrop with Glowing Golden Pins */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[400px] rounded-3xl glass-panel p-4 sm:p-6 flex items-center justify-center overflow-hidden border border-white shadow-glass my-4">
            
            {/* India Map Stylized SVG silhouette */}
            <svg
              viewBox="0 0 500 560"
              className="w-full h-full opacity-50 text-blue-400"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M190 20 L230 40 L260 70 L230 110 L280 130 L350 140 L420 160 L440 180 L410 210 L370 200 L340 230 L320 280 L350 320 L300 390 L260 490 L240 540 L220 500 L180 410 L160 350 L140 290 L120 240 L110 200 L150 180 L180 130 L160 70 Z" />
            </svg>

            {/* Glowing Golden Location Pins (#F1C40F with radiant glow) */}
            {mapPins.map((pin) => {
              const isSelected = selectedCity.includes(pin.name);
              return (
                <div
                  key={pin.name}
                  style={{ top: pin.top, left: pin.left }}
                  onMouseEnter={() => setHoveredCity(pin.name)}
                  onMouseLeave={() => setHoveredCity(null)}
                  onClick={() => {
                    setSelectedCity(`${pin.name}, ${pin.state}`);
                    handleSelectRole("consumer");
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                >
                  {/* Glowing Golden Aura */}
                  <div className="relative flex items-center justify-center">
                    <span className="w-5 h-5 rounded-full bg-amber-400/50 animate-ping absolute" />
                    
                    {/* Golden Pin droplet (#F1C40F) */}
                    <div className={`w-6 h-6 rounded-full golden-pin flex items-center justify-center border-2 border-white transform transition-transform duration-200 ${
                      isSelected ? "scale-135 ring-4 ring-amber-300" : "group-hover:scale-125"
                    }`}>
                      <div className="w-2 h-2 rounded-full bg-white shadow-xs" />
                    </div>
                  </div>

                  {/* City Tooltip on Hover */}
                  <div className={`absolute bottom-7 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-[10px] font-semibold whitespace-nowrap shadow-2xl border border-white/20 transition-all duration-200 pointer-events-none z-30 ${
                    hoveredCity === pin.name ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}>
                    <span className="text-[#F1C40F] font-bold block">{pin.name}, {pin.state}</span>
                    <span className="text-[9px] text-slate-300">{pin.count} • Click to View</span>
                  </div>
                </div>
              );
            })}

            {/* Active Selected City Ticker */}
            <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 px-3 py-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 text-[11px] font-bold text-slate-800 shadow-sm flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Selected: <strong className="text-blue-600">{selectedCity}</strong> • 28,400+ Active Gigs</span>
            </div>
          </div>
        </div>

        {/* 4. ARTISAN TESTIMONIALS (3 Glassmorphism Cards) */}
        <div className="w-full max-w-3xl mt-8 sm:mt-12 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="glass-panel p-4 sm:p-5 rounded-3xl flex flex-col items-center text-center space-y-3 hover:shadow-glass-hover transition-all duration-300"
              >
                {/* Profile Avatar */}
                <div className="relative">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Name & Region */}
                <div className="leading-tight">
                  <h3 className="text-sm font-bold text-slate-900">{t.name}</h3>
                  <span className="text-[11px] font-medium text-slate-500">{t.state} • {t.role}</span>
                </div>

                {/* Quote */}
                <p className="text-xs text-slate-700 italic leading-relaxed pt-1">
                  "{t.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. GRAND GLOSSY "JOIN NOW" BUTTON */}
        <div className="w-full max-w-sm mt-8 sm:mt-10">
          <button
            onClick={() => handleSelectRole("consumer")}
            className="w-full py-3.5 sm:py-4 rounded-2xl text-base sm:text-lg font-extrabold btn-glossy-orange shadow-md flex items-center justify-center gap-2 group transition-all duration-200 active:scale-95"
          >
            <span>Join Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>


        {/* 6. TRANSPARENCY & VALUE PROPOSITIONS */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Aadhaar & NCD Verified</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <BadgeIndianRupee className="w-4 h-4 text-blue-600" />
            <span>92% Direct Worker Payout</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            <span>6% e-Shram Pension & Insurance</span>
          </div>
        </div>

        {/* 7. FOOTER LINKS */}
        <footer className="w-full mt-12 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 KaryaSetu (कार्यसेतु) • National Labour Cooperatives Federation of India (NLCF)</p>
          <div className="flex items-center gap-4 font-medium">
            <button
              onClick={() => setIsPricingModalOpen(true)}
              className="hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setIsPricingModalOpen(true)}
              className="hover:text-blue-600 transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

