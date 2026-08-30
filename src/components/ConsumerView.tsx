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
  Star,
  Clock,
  Filter,
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

  return (
    <div className="w-full min-h-screen bg-transparent text-slate-900 relative selection:bg-blue-600 selection:text-white pb-24 font-sans">
      
      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-10 sm:space-y-14">
        
        {/* HERO EXPLORATION UNIT */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          {/* Sovereign Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-blue-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold tracking-wide text-slate-700">
              National Labour Cooperatives Federation (NLCF) Certified
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-extrabold border border-emerald-200">
              92% Direct Payout
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Book Verified Artisans in{" "}
            <span className="text-[#E67E22]">{selectedCity.split(",")[0]}</span>
          </h1>

          <p className="text-xs sm:text-sm font-semibold text-slate-700 max-w-xl mx-auto">
            100% statutory minimum wage baselines. Direct UPI settlement with zero surge multiplier.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto pt-2">
            <div className="relative flex items-center p-1.5 bg-white/95 backdrop-blur-md border border-slate-300 rounded-2xl shadow-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">
              <Search className="w-4 h-4 text-slate-400 ml-3.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Electricians, Plumbers, Vedic Pandits, Farm Milk..."
                className="w-full bg-transparent border-none px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
              />
              <button
                onClick={() => {
                  if (filteredServices.length > 0) openBookingModal(filteredServices[0]);
                }}
                className="shrink-0 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold btn-glossy-blue text-white transition-all shadow-md active:scale-95"
              >
                Search
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-[11px] text-slate-600">
              <span className="font-bold text-slate-500">Popular in {selectedCity.split(",")[0]}:</span>
              {["AC Service", "Switchboard Wiring", "Griha Pravesh Pandit", "A2 Desi Milk", "Solar Inverter"].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-2.5 py-0.5 rounded-lg bg-white/90 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors font-semibold shadow-2xs"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        </section>

        {/* CATEGORY FILTER TABS & SERVICE LIST */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Available Cooperative Services</span>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {filteredServices.length} Categories
                </span>
              </h2>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Every booking allocates 92% to worker bank account & 6% to e-Shram pension.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xs overflow-x-auto max-w-full">
              {[
                { id: "all", label: "All Services" },
                { id: "core", label: "Core Trades" },
                { id: "desi", label: "Everyday & Rituals" },
                { id: "commerce", label: "Co-op Farm & Crafts" },
                { id: "tech", label: "Tech & Security" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategoryTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategoryTab === tab.id
                      ? "btn-glossy-blue text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* SERVICE CARDS GRID WITH HIGH QUALITY IMAGES & ACCESSIBLE ALT TEXT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="glass-panel rounded-3xl overflow-hidden border border-white/90 shadow-card-soft hover:shadow-glass-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                {/* Service Photographic Visual Header */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.imageUrl}
                    alt={`${service.name} professional service banner`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-black/20" />

                  {/* Category & Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-black uppercase bg-white/95 backdrop-blur-md text-slate-800 shadow-sm border border-white">
                      {service.category}
                    </span>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-xl bg-slate-900/80 backdrop-blur-md text-amber-300 text-[11px] font-bold border border-white/20">
                      <Star className="w-3 h-3 fill-amber-300" />
                      <span>{service.avgRating}</span>
                    </div>
                  </div>

                  {/* Name Overlaid on Image Bottom */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-xl mb-0.5">{service.icon}</div>
                    <h3 className="text-base font-extrabold drop-shadow-sm leading-tight">
                      {language === "hi" ? service.nameHi : language === "mr" ? service.nameMr : service.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-700 font-medium line-clamp-2 leading-relaxed">
                    {language === "hi" ? service.descriptionHi : service.description}
                  </p>

                  {/* Popular Tags */}
                  <div className="flex flex-wrap gap-1">
                    {service.popularServices.slice(0, 2).map((pop) => (
                      <span
                        key={pop}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-semibold"
                      >
                        {pop}
                      </span>
                    ))}
                  </div>

                  {/* Transparent Pricing Split Footer */}
                  <div className="border-t border-slate-200/80 pt-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Base Wage Standard
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
                          ₹{service.baseWage}
                        </span>
                        <span className="text-[10px] text-slate-600 font-semibold">/{service.unit}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => openBookingModal(service)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold btn-glossy-blue text-white shadow-sm flex items-center gap-1 active:scale-95 transition-all"
                    >
                      <span>Book</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3-COLUMN VALUE INFOGRAPHIC */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-white shadow-glass grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2 p-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto text-lg shadow-sm">
              🏛️
            </div>
            <h4 className="text-sm font-bold text-slate-900">Cooperative Owned</h4>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Organized directly by registered primary labour cooperative societies across all Indian states.
            </p>
          </div>

          <div className="space-y-2 p-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-lg shadow-sm">
              🛡️
            </div>
            <h4 className="text-sm font-bold text-slate-900">e-Shram Social Security</h4>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Every job automatically locks 6% into worker accident and pension insurance funds.
            </p>
          </div>

          <div className="space-y-2 p-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-lg shadow-sm">
              ⚡
            </div>
            <h4 className="text-sm font-bold text-slate-900">Zero Surge Price Hikes</h4>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Fixed baselines regulated by State Minimum Wage Boards with zero algorithmic surge gouging.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

