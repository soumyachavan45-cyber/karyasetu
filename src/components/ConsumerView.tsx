"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { ServiceCategory } from "@/data/mockData";
import {
  Search,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  MapPin,
  Sparkles,
  Scale,
  BadgeIndianRupee,
  Building,
  HeartHandshake,
  CheckCircle2,
  Users,
  Layers,
  ChevronRight,
  Map,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export const ConsumerView: React.FC = () => {
  const {
    services,
    openBookingModal,
    selectedCity,
    setActiveTab,
    setIsPricingModalOpen,
    language,
    t,
    financialMetrics,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<
    "all" | "core" | "desi" | "commerce" | "tech"
  >("all");

  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameMr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.popularServices.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTab = selectedCategoryTab === "all" || s.category === selectedCategoryTab;

    return matchesSearch && matchesTab;
  });

  const coreTrades = services.filter((s) => s.category === "core");

  return (
    <div className="w-full min-h-screen bg-[#0B0B0C] text-zinc-100 relative selection:bg-emerald-500 selection:text-black pb-24">
      {/* Soft Ambient Radial Backdrop Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[520px] bg-radial-ambient pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 space-y-16">
        {/* HERO EXPLORATION UNIT */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          {/* Sovereign Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121314] border border-white/10 shadow-lg shadow-black/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-zinc-300">
              National Labour Cooperatives Federation (NLCF) Certified
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Code on Social Security 2020
            </span>
          </div>

          {/* Headline with Smooth Emerald-to-Teal Gradient */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
            {t.heroTitle1}{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              {t.heroTitleHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs text-zinc-300">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#121314] border border-white/5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>State-Verified Aadhaar & NCD</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#121314] border border-white/5">
              <BadgeIndianRupee className="w-4 h-4 text-emerald-400" />
              <span>92% Goes Directly to Workers</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#121314] border border-white/5">
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>Zero Surge Price Gouging</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto pt-4">
            <div className="relative flex items-center p-1.5 bg-[#121314] border border-white/10 rounded-2xl shadow-2xl focus-within:border-emerald-500/60 focus-within:ring-1 focus-within:ring-emerald-500/40 transition-all duration-300">
              <Search className="w-5 h-5 text-zinc-500 ml-3.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-transparent border-none px-3 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none"
              />
              <button
                onClick={() => {
                  if (filteredServices.length > 0) openBookingModal(filteredServices[0]);
                }}
                className="shrink-0 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-black hover:from-emerald-400 hover:to-teal-300 transition-all shadow-md shadow-emerald-500/20 active:scale-95"
              >
                {t.searchBtn}
              </button>
            </div>

            {/* Quick Search Suggestions */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-[11px] text-zinc-500">
              <span>Popular in {selectedCity}:</span>
              {["AC Deep Jet", "Switchboard Wiring", "Griha Pravesh Pandit", "A2 Desi Milk", "Solar Inverter"].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-2 py-0.5 rounded-md bg-[#161719] hover:bg-white/5 text-zinc-300 hover:text-emerald-400 border border-white/5 transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        </section>

        {/* 4-COLUMN BENTO GRID SERVICE MODULE ARRAY (Primary Core Trades) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>Core Trade Categories</span>
                <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  4-Column Bento
                </span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Fixed hourly wage baselines set by Maharashtra State Labour Minimum Wage Board.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#121314] border border-white/5 text-xs overflow-x-auto max-w-full">
              {[
                { id: "all", label: t.filterAll },
                { id: "core", label: t.filterTrades },
                { id: "desi", label: t.filterDesi },
                { id: "commerce", label: t.filterCommerce },
                { id: "tech", label: t.filterTech },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategoryTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                    selectedCategoryTab === tab.id
                      ? "bg-emerald-500 text-black font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* The Bento Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                onClick={() => openBookingModal(service)}
                className="group relative flex flex-col justify-between p-5 rounded-2xl bg-[#121314] border border-white/5 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Ambient Card Radial Gradient on Hover */}
                <div className="absolute inset-0 bg-radial-card opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Top Section */}
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    {/* Isolated Dark Inner Display Frame */}
                    <div className="w-12 h-12 rounded-xl bg-[#161719] border border-white/10 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 group-hover:border-emerald-500/30 transition-transform duration-300">
                      {service.icon}
                    </div>

                    {/* Diagonal Directional Arrow Indicator */}
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {language === "hi"
                        ? service.nameHi
                        : language === "mr"
                        ? service.nameMr
                        : service.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {language === "hi" ? service.descriptionHi : service.description}
                    </p>
                  </div>

                  {/* Popular chips */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {service.popularServices.slice(0, 2).map((pop, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#161719] text-zinc-400 border border-white/5"
                      >
                        {pop}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Foundational Metadata */}
                <div className="relative z-10 pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                      {t.baseWage}
                    </span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      {formatINR(service.baseWage)}
                    </span>
                    <span className="text-[10px] text-zinc-500 ml-1">/ visit</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-zinc-400 block font-medium">
                      {service.societiesCount} societies
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400/80">
                      ★ {service.avgRating} ({service.completedJobs})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COOPERATIVE CONTROL DATA & EMPOWERMENT VISUALIZATION */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel A: Financial Split Tracker Metric */}
          <div className="lg:col-span-1 p-6 rounded-2xl bg-[#121314] border border-white/10 shadow-2xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <BadgeIndianRupee className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    Financial Split Tracker
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  LIVE UPI SETTLEMENT
                </span>
              </div>

              <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                Direct statutory routing ensuring workers retain full economic surplus value without corporate cuts.
              </p>

              {/* Progress Bars */}
              <div className="mt-5 space-y-4 text-xs">
                {/* 92% Worker */}
                <div>
                  <div className="flex justify-between font-medium mb-1">
                    <span className="text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Worker Bank Account (Instant UPI)
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">92.0%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#161719] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[92%]" />
                  </div>
                </div>

                {/* 6% Welfare */}
                <div>
                  <div className="flex justify-between font-medium mb-1">
                    <span className="text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      e-Shram Pension & Accident Locker
                    </span>
                    <span className="font-mono text-blue-400 font-bold">6.0%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#161719] overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full w-[6%]" />
                  </div>
                </div>

                {/* 2% Admin */}
                <div>
                  <div className="flex justify-between font-medium mb-1">
                    <span className="text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      Local Co-op LFC Server & Hub Costs
                    </span>
                    <span className="font-mono text-purple-400 font-bold">2.0%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#161719] overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full w-[2%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Total platform volume */}
            <div className="p-3.5 bg-[#161719] rounded-xl border border-white/5 flex items-center justify-between text-xs">
              <div>
                <span className="text-zinc-400 text-[10px] uppercase font-mono block">
                  Total Dispatched Today
                </span>
                <span className="text-base font-bold font-mono text-white">
                  {formatINR(financialMetrics.totalVolume)}
                </span>
              </div>
              <button
                onClick={() => setIsPricingModalOpen(true)}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline"
              >
                View Full Audit
              </button>
            </div>
          </div>

          {/* Panel B: Live Multi-Wave Demand Trend & Bhuvan Radar Promo */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-[#121314] border border-white/10 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    Seasonal Demand Forecasting & Geospatial Hotspots
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Predictive deployment for Maharashtra artisan societies (Nagpur & Pune)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab("map")}
                className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors w-fit"
              >
                <Map className="w-3.5 h-3.5" />
                <span>Open Bhuvan Live Radar</span>
              </button>
            </div>

            {/* Simulated Neon Emerald Multi-Wave Waveform */}
            <div className="relative h-44 w-full bg-[#161719] rounded-xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                <span>DEMAND SPIKE PREDICTOR: SUMMER COOLING & FESTIVE ELEVATION</span>
                <span className="text-emerald-400 font-bold">AI FORECAST: +84% IN APRIL/OCTOBER</span>
              </div>

              {/* Multi-wave SVG Canvas */}
              <div className="relative w-full h-24 my-auto">
                <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="25" x2="500" y2="25" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                  <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                  <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />

                  {/* Wave 1: AC & HVAC Summer Peak */}
                  <path
                    d="M 0,80 Q 70,75 140,40 T 250,10 T 350,70 T 500,85"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    className="filter drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]"
                  />

                  {/* Wave 2: Electrical & Festive Autumn Peak */}
                  <path
                    d="M 0,65 Q 90,60 180,55 T 320,45 T 420,15 T 500,50"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="2"
                    strokeDasharray="6"
                    className="filter drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]"
                  />
                </svg>
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono border-t border-white/5 pt-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-0.5 bg-emerald-400 inline-block" /> HVAC & Cooling Wave
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-0.5 bg-cyan-400 inline-block" /> Electrical & Festive Wave
                </span>
                <span className="text-zinc-500">Jan — Dec Forecast Cycle</span>
              </div>
            </div>

            {/* Bottom Recommendation */}
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-zinc-300">
                  <strong>Society Dispatch Recommendation:</strong> Pre-deploy 15 certified electricians to Trimurti Nagar & Dighori hubs.
                </span>
              </div>
              <button
                onClick={() => setActiveTab("admin")}
                className="shrink-0 text-emerald-400 font-semibold hover:underline text-[11px]"
              >
                Open Admin Hub →
              </button>
            </div>
          </div>
        </section>

        {/* HOW COOPERATIVES EMPOWER - 3 PILLARS */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Why India Chooses SahakarGig
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Building sovereign digital public infrastructure for Indian artisans and households.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-[#121314] border border-white/5 hover:border-emerald-500/30 transition-colors space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">{t.safeAtHome}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{t.safeAtHomeDesc}</p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-[#121314] border border-white/5 hover:border-emerald-500/30 transition-colors space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">{t.fairFlatRates}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{t.fairFlatRatesDesc}</p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-[#121314] border border-white/5 hover:border-emerald-500/30 transition-colors space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">{t.directPayouts}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{t.directPayoutsDesc}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
