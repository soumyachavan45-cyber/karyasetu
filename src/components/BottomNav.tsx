"use client";

import React from "react";
import { useApp, ActiveTab } from "@/context/AppContext";
import {
  Layers,
  Map,
  LifeBuoy,
  User,
  Smartphone,
  Sparkles,
} from "lucide-react";

export const BottomNav: React.FC = () => {
  const {
    appSection,
    activeTab,
    setActiveTab,
    currentUser,
    setAppSection,
    setIsCustomerCareOpen,
    incomingJobAlert,
  } = useApp();

  if (appSection !== "app") return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/92 backdrop-blur-xl border-t border-slate-200/90 px-2 py-1 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] safe-area-pb">
      <div className="flex items-center justify-around">
        {/* Tab 1: Marketplace / Consumer */}
        <button
          onClick={() => setActiveTab("customer")}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl transition-all duration-200 ${
            activeTab === "customer"
              ? "text-blue-600 font-extrabold bg-blue-50/90 shadow-2xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">Market</span>
        </button>

        {/* Tab 2: Live Bhuvan Map */}
        <button
          onClick={() => setActiveTab("map")}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl transition-all duration-200 ${
            activeTab === "map"
              ? "text-indigo-600 font-extrabold bg-indigo-50/90 shadow-2xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Map className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">India Map</span>
        </button>

        {/* Tab 3: Worker View */}
        <button
          onClick={() => setActiveTab("worker")}
          className={`relative flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl transition-all duration-200 ${
            activeTab === "worker"
              ? "text-emerald-700 font-extrabold bg-emerald-50/90 shadow-2xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">Worker Gigs</span>
          {incomingJobAlert && (
            <span className="absolute top-0 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white animate-ping" />
          )}
        </button>

        {/* Tab 4: Account / Profile */}
        <button
          onClick={() => setActiveTab("account")}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl transition-all duration-200 ${
            activeTab === "account"
              ? "text-slate-900 font-extrabold bg-slate-100 shadow-2xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <User className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">Account</span>
        </button>

        {/* Tab 5: 24/7 Helpdesk */}
        <button
          onClick={() => setIsCustomerCareOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl text-slate-600 hover:text-blue-600 transition-all duration-200"
        >
          <LifeBuoy className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">Helpdesk</span>
        </button>
      </div>
    </nav>
  );
};

