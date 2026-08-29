"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { KaryaSetuLogo } from "@/components/KaryaSetuLogo";
import {
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  Smartphone,
  Building2,
  Lock,
  Globe,
  Map,
  BadgeIndianRupee,
  Scale,
  Users,
  CheckCircle2,
  Printer,
  TrendingUp,
  HeartHandshake,
  Layers,
  PhoneCall,
  Mic,
  Star,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export const LandingPage: React.FC<{ onGetStarted: () => void; onLogin: () => void }> = ({
  onGetStarted,
  onLogin,
}) => {
  const { setActiveTab, language, setLanguage, setIsPricingModalOpen } = useApp();

  return (
    <div className="w-full min-h-screen bg-[#0B0B0C] text-zinc-100 selection:bg-emerald-500 selection:text-black">
      {/* Soft Ambient Radial Backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial-ambient pointer-events-none z-0" />

      {/* 1. HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 space-y-8 text-center">
        {/* Sovereign Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121314] border border-emerald-500/30 shadow-xl shadow-black/80">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-zinc-300">
            National Labour Cooperatives Federation of India (NLCF)
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Sovereign Public Infrastructure
          </span>
        </div>

        {/* Grand Sanskrit Modern Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.12]">
            Bridging Work, Dignity &{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(16,185,129,0.35)]">
              Cooperative Power
            </span>
          </h1>
          <p className="text-base sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            <strong className="text-white">KaryaSetu (कार्यसेतु)</strong> flips the corporate aggregator model. A decentralized digital public marketplace owned by traditional labor societies—giving <strong className="text-emerald-400">92% direct payouts</strong> to artisans and automated <strong className="text-blue-400">e-Shram social security</strong>.
          </p>
        </div>

        {/* CTA Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 text-black hover:from-emerald-400 hover:to-teal-300 transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 group active:scale-95"
          >
            <Sparkles className="w-4 h-4 fill-black group-hover:rotate-12 transition-transform" />
            <span>Launch KaryaSetu Marketplace</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onLogin}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm font-semibold bg-[#121314] text-white border border-white/10 hover:border-emerald-500/40 hover:bg-[#161719] transition-all flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Role-Based Portal Login (Citizen • Worker • Admin)</span>
          </button>
        </div>

        {/* Value Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-xs text-zinc-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Aadhaar e-KYC Certified
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <BadgeIndianRupee className="w-4 h-4 text-emerald-400" /> 92% Direct Bank Transfer (UPI)
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-emerald-400" /> State Minimum Wage Board Aligned
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Printer className="w-4 h-4 text-emerald-400" /> Phygital LFC Physical Job Cards
          </span>
        </div>
      </section>

      {/* 2. REAL-TIME SOVEREIGN PLATFORM METRICS TICKER */}
      <section className="border-y border-white/10 bg-[#121314]/80 backdrop-blur-md py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-2xl sm:text-4xl font-black font-mono text-emerald-400">
                414+
              </span>
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-mono">
                Primary Labour Cooperatives
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-4xl font-black font-mono text-white">
                92.0%
              </span>
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-mono">
                Direct Worker Payout Rail
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-4xl font-black font-mono text-cyan-400">
                28,400+
              </span>
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-mono">
                Aadhaar & NCD Verified Artisans
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-4xl font-black font-mono text-amber-400">
                ₹94.5 L+
              </span>
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-mono">
                e-Shram Social Security Locked
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STRUCTURAL COMPARISON (Venture Capital vs. KaryaSetu Cooperative) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            A SOVEREIGN PARADIGM SHIFT
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Corporate Aggregators vs. KaryaSetu
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Private gig platforms trap blue-collar workers with exorbitant commission cuts and opaque algorithms. KaryaSetu returns platform ownership to India's traditional labor societies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Corporate Platforms */}
          <div className="p-8 rounded-3xl bg-[#121314] border border-rose-500/20 shadow-2xl relative space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 font-bold text-sm">
                  ✕
                </div>
                <h3 className="text-lg font-bold text-rose-300">
                  Private Aggregators (e.g. Urban Company)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                PROFIT EXTRACTION
              </span>
            </div>

            <ul className="space-y-4 text-xs text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold text-sm mt-0.5">✘</span>
                <div>
                  <strong className="text-white block">Massive Commissions (20% – 35%):</strong>
                  Workers lose up to a third of every hard-earned rupee to corporate shareholders.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold text-sm mt-0.5">✘</span>
                <div>
                  <strong className="text-white block">No Safety Nets or Pensions:</strong>
                  Zero statutory contributions to accident insurance or old-age security funds.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold text-sm mt-0.5">✘</span>
                <div>
                  <strong className="text-white block">Sudden Surge Price Gouging:</strong>
                  Opaque algorithmic price spikes that exploit customers during emergencies.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold text-sm mt-0.5">✘</span>
                <div>
                  <strong className="text-white block">Exclusion of Non-Smartphone Artisans:</strong>
                  Older master carpenters and plumbers without modern smartphones are locked out.
                </div>
              </li>
            </ul>
          </div>

          {/* Card 2: KaryaSetu Model */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#121314] via-[#121314] to-emerald-950/20 border-2 border-emerald-500/50 shadow-2xl shadow-emerald-500/10 relative space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-emerald-300">
                  KaryaSetu (Cooperative Digital Public Rail)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                DEMOCRATIC OWNERSHIP
              </span>
            </div>

            <ul className="space-y-4 text-xs text-zinc-200">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-sm mt-0.5">✓</span>
                <div>
                  <strong className="text-white block">92.0% Direct Take-Home Wage:</strong>
                  Instant UPI settlement straight to the artisan's bank account with zero middleman deductions.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-sm mt-0.5">✓</span>
                <div>
                  <strong className="text-white block">Automated e-Shram Welfare (6%):</strong>
                  Direct compliance with India's Code on Social Security 2020 (PMSBY + Ayushman Bharat).
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-sm mt-0.5">✓</span>
                <div>
                  <strong className="text-white block">Fair Pre-Fixed Wage Baselines:</strong>
                  Prices strictly aligned with State Labour Minimum Wage Boards without hidden surge fees.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-sm mt-0.5">✓</span>
                <div>
                  <strong className="text-white block">Phygital Labour Felicitation Centres (LFC):</strong>
                  Local physical cooperative hubs register offline artisans and print physical work sheets.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. THE 4 SOVEREIGN INDIAN TECH RAILS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            SOVEREIGN DIGITAL INFRASTRUCTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Built on India's Open Tech Stack
          </h2>
          <p className="text-sm text-zinc-400">
            No reliance on proprietary foreign monopolies. KaryaSetu connects into national digital public infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Rail 1 */}
          <div className="p-6 rounded-2xl bg-[#121314] border border-white/5 hover:border-emerald-500/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Aadhaar & NCD e-KYC</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Instant background checks, trade guild certifications, and verified cooperative membership records.
            </p>
          </div>

          {/* Rail 2 */}
          <div className="p-6 rounded-2xl bg-[#121314] border border-white/5 hover:border-emerald-500/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Map className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">ISRO Bhuvan Mapping</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              India's sovereign satellite mapping for hyper-local worker tracking and duty geofencing without costly APIs.
            </p>
          </div>

          {/* Rail 3 */}
          <div className="p-6 rounded-2xl bg-[#121314] border border-white/5 hover:border-emerald-500/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">ONDC & Beckn Protocol</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Enables citizens to discover and book certified cooperative artisans through everyday buyer apps.
            </p>
          </div>

          {/* Rail 4 */}
          <div className="p-6 rounded-2xl bg-[#121314] border border-white/5 hover:border-emerald-500/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Mic className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Bhashini Multilingual AI</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Voice-first speech commands in Hindi, Marathi, and Tamil so smartphone artisans never struggle with typing.
            </p>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE 3-TIER ECOSYSTEM PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            THE 3-TIER APPLICATION ECOSYSTEM
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Designed for Every Stakeholder
          </h2>
          <p className="text-sm text-zinc-400">
            Experience the three distinct interfaces tailored for households, artisans, and federation managers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Consumer Card */}
          <div
            onClick={() => {
              setActiveTab("customer");
              onGetStarted();
            }}
            className="p-6 rounded-3xl bg-[#121314] border border-white/10 hover:border-emerald-500/50 hover:shadow-2xl transition-all cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🛒
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
              1. Consumer Marketplace
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              3-click booking for Electricians, Plumbers, AC Repair, Vedic Pandits, Farm Produce & SHG Crafts with upfront flat wages.
            </p>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              Enter Marketplace →
            </span>
          </div>

          {/* Worker Card */}
          <div
            onClick={() => {
              setActiveTab("worker");
              onGetStarted();
            }}
            className="p-6 rounded-3xl bg-[#121314] border border-white/10 hover:border-emerald-500/50 hover:shadow-2xl transition-all cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              📱
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
              2. Worker Mobile App View
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Outdoor low-glare sun mode, oversized `[ACCEPT]` buttons, Bhashini AI voice actions, and live e-Shram pension tracker.
            </p>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              View Artisan Interface →
            </span>
          </div>

          {/* Admin Hub Card */}
          <div
            onClick={() => {
              setActiveTab("admin");
              onGetStarted();
            }}
            className="p-6 rounded-3xl bg-[#121314] border border-white/10 hover:border-emerald-500/50 hover:shadow-2xl transition-all cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🏢
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
              3. Co-op Federation Admin Hub
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Labour Felicitation Centre (LFC) desk to match offline artisans, print physical job sheets, and track Bhuvan geofences.
            </p>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              Open Admin Dashboard →
            </span>
          </div>
        </div>
      </section>

      {/* 6. VOICES FROM THE COOPERATIVE GUILDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Voices from India's Artisans
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Real stories from cooperative members across Maharashtra.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#121314] border border-white/5 space-y-3">
            <div className="flex items-center gap-1 text-amber-400 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <p className="text-xs text-zinc-300 italic leading-relaxed">
              "On private apps, ₹300 out of every ₹1,000 job went to the company. On KaryaSetu, I take home ₹920 straight to my bank via UPI, and ₹60 automatically builds my e-Shram accident and retirement fund."
            </p>
            <div>
              <h4 className="text-xs font-bold text-white">Ramesh Kumar</h4>
              <span className="text-[10px] text-emerald-400 font-mono">
                Electrician, Nagpur Central Labour Co-op (NLCF-78)
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#121314] border border-white/5 space-y-3">
            <div className="flex items-center gap-1 text-amber-400 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <p className="text-xs text-zinc-300 italic leading-relaxed">
              "I don't have a smartphone. Every morning I walk into the Sitabuldi LFC office. The manager prints out my job card and hands me my cash vouchers upon completion. KaryaSetu treats us like dignity co-owners."
            </p>
            <div>
              <h4 className="text-xs font-bold text-white">Bhikaji Shinde</h4>
              <span className="text-[10px] text-cyan-400 font-mono">
                Senior Carpenter, Sitabuldi Shramik Sanstha
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#121314] border border-white/5 space-y-3">
            <div className="flex items-center gap-1 text-amber-400 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <p className="text-xs text-zinc-300 italic leading-relaxed">
              "Our women's self-help group now delivers fresh A2 cow milk and handloom crafts directly to city households without middleman commissions. The ONDC gateway gives us incredible volume."
            </p>
            <div>
              <h4 className="text-xs font-bold text-white">Anjali Tayade</h4>
              <span className="text-[10px] text-purple-400 font-mono">
                SHG Lead, Maa Sharda Mahila Krishi Sanstha
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GRAND BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-emerald-950/50 via-[#121314] to-teal-950/40 border border-emerald-500/40 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Ready to Experience Fair Work in India?
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
              Join thousands of certified artisans and households on India's sovereign cooperative platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-bold bg-emerald-500 text-black hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Explore Live Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onLogin}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm font-semibold bg-[#161719] text-white border border-white/10 hover:border-emerald-500/40 transition-colors"
            >
              <span>Login to Your Portal</span>
            </button>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="border-t border-white/10 py-8 bg-[#0B0B0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <KaryaSetuLogo size="sm" showTagline={false} />
          <p>© 2026 KaryaSetu (कार्यसेतु) • National Labour Cooperatives Federation of India (NLCF). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsPricingModalOpen(true)} className="hover:text-white">
              Code on Social Security 2020
            </button>
            <button onClick={onLogin} className="hover:text-emerald-400">
              Cooperative Portal Login
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
