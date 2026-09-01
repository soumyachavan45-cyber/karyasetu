"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { ServiceCategory } from "@/data/mockData";
import { EmergencySection } from "@/components/EmergencySection";
import {
  Search,
  Sparkles,
  ShieldCheck,
  Zap,
  MapPin,
  Star,
  Users,
  BadgeIndianRupee,
  Clock,
  ArrowRight,
  Filter,
  CheckCircle2,
  HeartHandshake,
  Mic,
  AlertOctagon,
  LifeBuoy,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export const ConsumerView: React.FC = () => {
  const {
    services,
    t,
    openBookingModal,
    selectedCity,
    setActiveTab,
    setIsVoiceModalOpen,
    setIsCustomerCareOpen,
    language,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: t.filterAll },
    { id: "core", label: t.filterTrades },
    { id: "desi", label: t.filterDesi },
    { id: "commerce", label: t.filterCommerce },
    { id: "tech", label: t.filterTech },
  ];

  // Full-text search matching across english, hindi, marathi, and tags
  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      service.name.toLowerCase().includes(query) ||
      service.nameHi.toLowerCase().includes(query) ||
      service.nameMr.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.descriptionHi.toLowerCase().includes(query) ||
      service.popularServices.some((p) => p.toLowerCase().includes(query)) ||
      service.govWageStandard.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8">
      {/* 1. Hero Search & Value Pillars */}
      <section className="relative rounded-3xl p-5 sm:p-8 md:p-10 glass-panel border border-white/90 shadow-glass overflow-hidden space-y-5">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/90 border border-blue-200 text-blue-700 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>National Labour Cooperatives Federation (NLCF) Aligned</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            {t.heroTitle1}{" "}
            <span className="text-[#E67E22] drop-shadow-xs">
              {t.heroTitleHighlight}
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Search Bar with Multilingual Speech Trigger */}
        <div className="flex flex-col sm:flex-row gap-2.5 max-w-3xl pt-1">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-white/90 border border-slate-200 rounded-2xl pl-10 pr-12 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-inner"
            />
            <button
              type="button"
              onClick={() => setIsVoiceModalOpen(true)}
              className="absolute right-2.5 top-2 p-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 transition-colors"
              title="Voice Search in Hindi / Marathi / English (Bhashini AI)"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setActiveTab("map")}
            className="px-5 py-3 rounded-2xl btn-glossy-blue text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 shrink-0"
          >
            <MapPin className="w-4 h-4" />
            <span>{t.searchBtn}</span>
          </button>
        </div>

        {/* Quick Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200/80">
          <div className="flex items-center gap-2.5 text-xs text-slate-700">
            <div className="w-7 h-7 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-slate-900 block">{t.safeAtHome}</strong>
              <span className="text-[11px] text-slate-500">{t.safeAtHomeDesc}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-slate-700">
            <div className="w-7 h-7 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
              <BadgeIndianRupee className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-slate-900 block">{t.fairFlatRates}</strong>
              <span className="text-[11px] text-slate-500">{t.fairFlatRatesDesc}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-slate-700">
            <div className="w-7 h-7 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-slate-900 block">{t.directPayouts}</strong>
              <span className="text-[11px] text-slate-500">{t.directPayoutsDesc}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ON-DEMAND SOS EMERGENCY SERVICES SECTION */}
      <EmergencySection />

      {/* 3. Filter Category Chips & Helpdesk Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "btn-glossy-blue text-white shadow-sm"
                  : "bg-white/80 text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsCustomerCareOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white/80 text-blue-700 border border-blue-200 hover:bg-blue-50 transition-colors shadow-2xs shrink-0 self-end sm:self-auto"
        >
          <LifeBuoy className="w-3.5 h-3.5" />
          <span>24/7 Citizen Helpdesk</span>
        </button>
      </div>

      {/* 4. Bento Grid Services Catalog with Service Photography */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="group relative rounded-3xl glass-card border border-white/90 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Top Photography Banner */}
            <div className="relative w-full h-40 overflow-hidden bg-slate-100">
              <img
                src={service.imageUrl}
                alt={service.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20" />
              
              {/* Floating Service Icon & Government Standard Badge */}
              <div className="absolute top-3 left-3 w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md shadow-md border border-white flex items-center justify-center text-xl">
                {service.icon}
              </div>

              <div className="absolute top-3 right-3">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-900 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full border border-white shadow-xs">
                  {service.govWageStandard}
                </span>
              </div>

              {/* Cooperative Societies Count */}
              <div className="absolute bottom-2.5 left-3 text-white text-[11px] font-medium flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>{service.societiesCount} Co-op Societies</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {language === "hi"
                      ? service.nameHi
                      : language === "mr"
                      ? service.nameMr
                      : service.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed font-medium">
                    {language === "hi" ? service.descriptionHi : service.description}
                  </p>
                </div>

                {/* Popular Sub-Services Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {service.popularServices.map((pop, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-100/90 text-slate-700 border border-slate-200 font-medium"
                    >
                      {pop}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Booking Action */}
              <div className="pt-3.5 border-t border-slate-200/80 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block font-bold">
                      {t.baseWage}
                    </span>
                    <div className="text-lg font-black font-mono text-slate-900">
                      {formatINR(service.baseWage)}{" "}
                      <span className="text-xs text-slate-500 font-normal">/ {service.unit}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-amber-600 font-mono font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{service.avgRating}</span>
                    <span className="text-slate-400 font-normal">({service.completedJobs})</span>
                  </div>
                </div>

                {/* Instant Razorpay Booking Button */}
                <button
                  onClick={() => openBookingModal(service)}
                  className="w-full py-2.5 rounded-xl font-bold btn-glossy-blue text-white transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 text-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.quickBook} (92% to Artisan)</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
