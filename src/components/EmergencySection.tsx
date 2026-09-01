"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import {
  AlertOctagon,
  Zap,
  Droplets,
  KeyRound,
  Flame,
  Ambulance,
  PhoneCall,
  Clock,
  ShieldAlert,
} from "lucide-react";
import { ServiceCategory } from "@/data/mockData";

export const EmergencySection: React.FC = () => {
  const { openBookingModal, services, addToast } = useApp();

  const emergencyServices = [
    {
      id: "emg-elec",
      title: "Midnight Short Circuit & Fire Hazard",
      tradeId: "electrical",
      icon: <Zap className="w-5 h-5 text-amber-600" />,
      baseWage: 499,
      sla: "12-15 Mins",
      badge: "HIGH PRIORITY",
    },
    {
      id: "emg-plumb",
      title: "Burst Pipe & Indoor Flooding",
      tradeId: "plumbing",
      icon: <Droplets className="w-5 h-5 text-blue-600" />,
      baseWage: 450,
      sla: "10-15 Mins",
      badge: "IMMEDIATE",
    },
    {
      id: "emg-lock",
      title: "Door Jammed / Urgent Lockout",
      tradeId: "carpentry",
      icon: <KeyRound className="w-5 h-5 text-emerald-600" />,
      baseWage: 399,
      sla: "15 Mins",
      badge: "24x7 DISPATCH",
    },
    {
      id: "emg-gas",
      title: "LPG Gas Leak & Safety Check",
      tradeId: "solar_ev",
      icon: <Flame className="w-5 h-5 text-rose-600" />,
      baseWage: 550,
      sla: "10 Mins",
      badge: "CRITICAL SOS",
    },
  ];

  const handleEmergencyTrigger = (emg: (typeof emergencyServices)[0]) => {
    const matchedService =
      services.find((s) => s.id === emg.tradeId) || services[0];

    addToast(
      "🚨 SOS Emergency Dispatch Triggered!",
      `Locating nearest active artisan for '${emg.title}' within ${emg.sla}.`,
      "alert"
    );

    openBookingModal({
      ...matchedService,
      name: `🚨 SOS: ${emg.title}`,
      baseWage: emg.baseWage,
    });
  };

  return (
    <div className="w-full my-6 sm:my-8 p-5 sm:p-7 rounded-3xl glass-panel border-2 border-rose-300 bg-white/85 shadow-xl relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-rose-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-600 animate-pulse shrink-0 shadow-xs">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                24/7 On-Demand SOS Emergency Services
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-rose-600 text-white animate-pulse">
                15-MIN SLA
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Immediate cooperative rapid-response dispatch for household hazards and urgent lockouts.
            </p>
          </div>
        </div>

        <a
          href="tel:112"
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-colors shadow-md shrink-0 active:scale-95"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Emergency Police / Medical (112)</span>
        </a>
      </div>

      {/* Grid of Emergency Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4">
        {emergencyServices.map((emg) => (
          <div
            key={emg.id}
            onClick={() => handleEmergencyTrigger(emg)}
            className="p-4 rounded-2xl bg-white/90 border border-rose-200 hover:border-rose-400 hover:bg-rose-50/70 cursor-pointer transition-all space-y-3 group shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center">
                {emg.icon}
              </div>
              <span className="text-[9px] font-mono font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">
                {emg.badge}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-rose-700 transition-colors leading-snug">
                {emg.title}
              </h4>
              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono mt-1">
                <Clock className="w-3 h-3 text-rose-600" />
                <span>Response SLA: {emg.sla}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-rose-100 text-xs">
              <span className="font-mono font-black text-slate-900">₹{emg.baseWage}</span>
              <span className="text-[10px] font-bold text-rose-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Instant SOS →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

