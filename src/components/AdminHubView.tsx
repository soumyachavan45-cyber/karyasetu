"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Booking, Worker } from "@/data/mockData";
import {
  Building2,
  Printer,
  UserPlus,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  Layers,
  Radio,
  Share2,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  BadgeIndianRupee,
  Users,
  Smartphone,
  ChevronRight,
  Filter,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export const AdminHubView: React.FC = () => {
  const {
    bookings,
    workers,
    matchOfflineWorker,
    openPrintTicketModal,
    financialMetrics,
    selectedCity,
    language,
    t,
    setActiveTab,
  } = useApp();

  const [activeTabSub, setActiveTabSub] = useState<"bookings" | "workers" | "welfare" | "forecast">(
    "bookings"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedMatchingBooking, setSelectedMatchingBooking] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.area.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const offlineWorkers = workers.filter((w) => !w.hasSmartphone);
  const onlineWorkers = workers.filter((w) => w.hasSmartphone);

  return (
    <div className="w-full min-h-screen bg-[#0B0B0C] text-zinc-100 pb-20">
      {/* Top Federation Header */}
      <div className="bg-[#121314] border-b border-white/10 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  SahakarGig Admin Hub
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  LFC-NAGPUR-01
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                🏢 Nagpur Central District Federation (NLCF Primary Member Society #78)
              </p>
            </div>
          </div>

          {/* Real-time System Indicators */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#161719] border border-emerald-500/30 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>e-Shram API: [🟢 CONNECTED]</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#161719] border border-cyan-500/30 text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>ONDC Gateway: [🟢 RECEIVING LEADS]</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto">
          {[
            { id: "bookings", label: "📋 Live Bookings & Dispatch", count: bookings.length },
            { id: "workers", label: "👥 Worker Registry (Physical Hub)", count: workers.length },
            { id: "welfare", label: "🏦 e-Shram Welfare Reserves", count: "₹" + financialMetrics.welfareLockerTotal },
            { id: "forecast", label: "📈 AI Demand Forecasting", count: "+84% Peak" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabSub(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTabSub === tab.id
                  ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
                  : "bg-[#121314] text-zinc-400 hover:text-white border border-white/5"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                  activeTabSub === tab.id ? "bg-black/30 text-black font-bold" : "bg-white/5 text-zinc-400"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTabSub === "bookings" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT COLUMN: LIVE REQUESTS (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Search & Filter Bar */}
              <div className="p-3 bg-[#121314] rounded-2xl border border-white/10 flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search bookings, areas, customer name..."
                    className="w-full bg-[#161719] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-1 text-xs">
                  {["all", "unassigned", "assigned", "otp_verified", "completed"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1.5 rounded-lg capitalize text-[11px] font-medium transition-colors ${
                        statusFilter === st
                          ? "bg-white/10 text-white font-semibold border border-white/20"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {st === "all" ? "All" : st.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bookings List */}
              <div className="space-y-3">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-2xl bg-[#121314] border border-white/10 hover:border-white/20 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-white">{b.id}</span>
                          <span className="text-zinc-500 text-[10px]">•</span>
                          <span className="text-zinc-400 text-xs font-mono">{b.timestamp}</span>
                          {b.status === "unassigned" && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 animate-pulse">
                              🚨 UNASSIGNED
                            </span>
                          )}
                          {b.status === "assigned" && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                              ✅ {b.assignedWorker?.name.split(" ")[0]} Assigned
                            </span>
                          )}
                          {b.status === "otp_verified" && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                              ⚡ In-Progress
                            </span>
                          )}
                          {b.status === "completed" && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              ✓ Setteled (92% UPI)
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm font-bold text-white">{b.serviceName}</h3>
                        <p className="text-xs text-zinc-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-zinc-500" />
                          {b.area}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold font-mono text-emerald-400 block">
                          {formatINR(b.baseAmount)}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          Worker: {formatINR(b.workerPayout)}
                        </span>
                      </div>
                    </div>

                    {/* Action Toolbar for LFC Managers */}
                    <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
                      <div className="text-[11px] text-zinc-400">
                        Customer: <strong className="text-zinc-200">{b.customerName}</strong> ({b.customerPhone})
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Match Offline Worker Trigger */}
                        {b.status === "unassigned" && (
                          <button
                            onClick={() => setSelectedMatchingBooking(b)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition-colors"
                          >
                            <UserPlus className="w-3.5 h-3.5" />
                            <span>Match Offline Worker</span>
                          </button>
                        )}

                        {/* Print Physical Job Sheet Trigger */}
                        <button
                          onClick={() => openPrintTicketModal(b)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#161719] border border-white/10 text-zinc-300 hover:text-white hover:border-emerald-500/40 transition-colors"
                          title="Print thermal work ticket for non-smartphone artisans"
                        >
                          <Printer className="w-3.5 h-3.5 text-emerald-400" />
                          <span>🖨️ Print Physical Job Ticket</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: BHUVAN LOCAL RADAR & QUICK STATS (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Bhuvan Geofenced Local Radar Card */}
              <div className="p-5 rounded-2xl bg-[#121314] border border-white/10 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <h3 className="text-sm font-bold text-white">
                      Bhuvan Geofenced Artisan Radar
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab("map")}
                    className="text-xs text-emerald-400 hover:underline font-semibold"
                  >
                    Expand Map →
                  </button>
                </div>

                <div className="relative h-48 bg-[#161719] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center p-3">
                  {/* Radar animation circles */}
                  <div className="absolute w-36 h-36 rounded-full border border-emerald-500/20 animate-ping" />
                  <div className="absolute w-24 h-24 rounded-full border border-emerald-500/30" />
                  <div className="absolute w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/50" />

                  {/* Artisan dots in Nagpur */}
                  <div className="absolute top-8 left-12 flex items-center gap-1 text-[10px] text-emerald-300 font-mono bg-black/80 px-2 py-0.5 rounded border border-emerald-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Ramesh K. (#4012)
                  </div>
                  <div className="absolute bottom-10 right-14 flex items-center gap-1 text-[10px] text-amber-300 font-mono bg-black/80 px-2 py-0.5 rounded border border-amber-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Santosh G. (#3890)
                  </div>
                  <div className="absolute bottom-8 left-16 flex items-center gap-1 text-[10px] text-cyan-300 font-mono bg-black/80 px-2 py-0.5 rounded border border-cyan-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Bhikaji S. (LFC Hub)
                  </div>

                  <span className="text-[10px] font-mono text-zinc-500 absolute bottom-2 right-2">
                    Nagpur District Federation Geofence
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-[#161719] border border-white/5">
                    <span className="text-emerald-400 font-bold font-mono text-sm">
                      {workers.filter((w) => w.status === "available").length}
                    </span>
                    <span className="text-[10px] text-zinc-400 block">Available</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#161719] border border-white/5">
                    <span className="text-amber-400 font-bold font-mono text-sm">
                      {workers.filter((w) => w.status === "busy").length}
                    </span>
                    <span className="text-[10px] text-zinc-400 block">On Job</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#161719] border border-white/5">
                    <span className="text-cyan-400 font-bold font-mono text-sm">
                      {offlineWorkers.length}
                    </span>
                    <span className="text-[10px] text-zinc-400 block">LFC Walk-ins</span>
                  </div>
                </div>
              </div>

              {/* Offline Walk-in Artisans Quick Dispatch */}
              <div className="p-5 rounded-2xl bg-[#121314] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>LFC Walk-in Artisans (No Smartphone)</span>
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-400">Physical Registry</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Workers present at the physical cooperative building ready for printed work cards.
                </p>

                <div className="space-y-2">
                  {offlineWorkers.map((w) => (
                    <div
                      key={w.id}
                      className="p-3 bg-[#161719] rounded-xl border border-white/5 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={w.photoUrl}
                          alt={w.name}
                          className="w-8 h-8 rounded-lg object-cover border border-white/10"
                        />
                        <div>
                          <p className="font-bold text-white">{w.name}</p>
                          <span className="text-[10px] text-zinc-400 font-mono">
                            {w.trade} • {w.workerId}
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                        At LFC Desk
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WORKER REGISTRY TAB */}
        {activeTabSub === "workers" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">
                Cooperative Member Artisans ({workers.length} Registered)
              </h2>
              <span className="text-xs font-mono text-emerald-400">
                100% Aadhaar e-KYC & NCD Verified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workers.map((worker) => (
                <div
                  key={worker.id}
                  className="p-4 rounded-2xl bg-[#121314] border border-white/10 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={worker.photoUrl}
                        alt={worker.name}
                        className="w-12 h-12 rounded-xl object-cover border border-emerald-500/40"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white">{worker.name}</h4>
                        <p className="text-xs text-emerald-400 font-medium">{worker.trade}</p>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {worker.workerId}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        worker.status === "available"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {worker.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="p-2.5 bg-[#161719] rounded-xl border border-white/5 space-y-1 text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>e-Shram UAN:</span>
                      <span className="text-white font-mono text-[11px]">
                        {worker.eShramCardNo}
                      </span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Today's Settlement:</span>
                      <span className="text-emerald-400 font-mono font-bold">
                        {formatINR(worker.todayEarnings)}
                      </span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Access Type:</span>
                      <span className="text-zinc-300">
                        {worker.hasSmartphone ? "📱 Smartphone Web App" : "🖨️ Physical LFC Ticket"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WELFARE TAB */}
        {activeTabSub === "welfare" && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/30 to-emerald-950/30 border border-blue-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-7 h-7 text-blue-400" />
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      National e-Shram Welfare Fund Allocation
                    </h2>
                    <p className="text-xs text-zinc-400">
                      Compliance with India's Code on Social Security, 2020
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono text-zinc-400 block">
                    Total Welfare Corpus Accumulated
                  </span>
                  <span className="text-2xl font-black font-mono text-emerald-400">
                    {formatINR(financialMetrics.welfareLockerTotal)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-3 bg-[#121314] rounded-xl border border-white/5">
                  <span className="text-zinc-400 block">Accident Insurance (PMSBY)</span>
                  <span className="text-sm font-bold text-white mt-1 block">₹2,00,000 Cover</span>
                  <span className="text-[10px] text-emerald-400">100% Active</span>
                </div>
                <div className="p-3 bg-[#121314] rounded-xl border border-white/5">
                  <span className="text-zinc-400 block">Ayushman PM-JAY Medical</span>
                  <span className="text-sm font-bold text-white mt-1 block">₹5,00,000 Health</span>
                  <span className="text-[10px] text-emerald-400">Locker Linked</span>
                </div>
                <div className="p-3 bg-[#121314] rounded-xl border border-white/5">
                  <span className="text-zinc-400 block">Old-Age Pension Trust</span>
                  <span className="text-sm font-bold text-white mt-1 block">Monthly Annuity</span>
                  <span className="text-[10px] text-emerald-400">EPFO Direct Settlement</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DEMAND FORECAST TAB */}
        {activeTabSub === "forecast" && (
          <div className="p-6 rounded-2xl bg-[#121314] border border-white/10 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span>AI Predictive Demand & Society Capacity Dispatch</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Machine learning regression models analyzing seasonal weather spikes and regional festival calendars.
              </p>
            </div>

            <div className="p-4 bg-[#161719] rounded-xl border border-white/5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                Key AI Deployment Directives for Nagpur Region:
              </h3>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">1.</span>
                  <span>
                    <strong>Summer HVAC Surge (April - June):</strong> Expecting 220% spike in AC gas refill & deep jet cleaning. Advise 18 technical societies to stock refrigerant inventory.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">2.</span>
                  <span>
                    <strong>Festive Puja & Decor Wave (September - November):</strong> Griha Pravesh & Mehendi demand up 180%. Pre-register 35 additional Vedic purohits and festive cooks.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">3.</span>
                  <span>
                    <strong>Micro-Dairy Delivery Expansion:</strong> Wardhaman Nagar route running at 94% capacity. Authorize second delivery van.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM ROW: SYSTEM INTEGRATION RAILS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="p-4 rounded-2xl bg-[#121314] border border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <div>
              <span className="text-[10px] text-zinc-500 font-mono block">IDENTITY LAYER</span>
              <strong className="text-white">Aadhaar & NCD e-KYC</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <div>
              <span className="text-[10px] text-zinc-500 font-mono block">PAYMENT SETTLEMENT</span>
              <strong className="text-white">NPCI Setu UPI 92% Rail</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <div>
              <span className="text-[10px] text-zinc-500 font-mono block">GEOSPATIAL CORE</span>
              <strong className="text-white">ISRO Bhuvan Tracking</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <div>
              <span className="text-[10px] text-zinc-500 font-mono block">COMMERCE PROTOCOL</span>
              <strong className="text-white">Beckn / ONDC Gateway</strong>
            </div>
          </div>
        </div>
      </div>

      {/* MATCH OFFLINE WORKER MODAL POPUP */}
      {selectedMatchingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#121314] border border-white/10 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white">
                Match Offline Artisan for #{selectedMatchingBooking.id}
              </h3>
              <button
                onClick={() => setSelectedMatchingBooking(null)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Select an artisan present at the Labour Felicitation Centre (LFC) to dispatch:
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {workers.map((w) => (
                <button
                  key={w.id}
                  onClick={() => {
                    matchOfflineWorker(selectedMatchingBooking.id, w.id);
                    setSelectedMatchingBooking(null);
                  }}
                  className="w-full p-3 rounded-xl bg-[#161719] border border-white/5 hover:border-emerald-500/40 text-left flex items-center justify-between text-xs group"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={w.photoUrl}
                      alt={w.name}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-bold text-white group-hover:text-emerald-400">{w.name}</p>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {w.trade} • {w.hasSmartphone ? "📱 Online" : "🖨️ Offline"}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400">Assign →</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
