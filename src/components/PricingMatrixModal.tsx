"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { X, Check, ShieldAlert, Sparkles, Building2, HeartHandshake, ShieldCheck } from "lucide-react";

export const PricingMatrixModal: React.FC = () => {
  const { isPricingModalOpen, setIsPricingModalOpen, language, services } = useApp();

  if (!isPricingModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-[#121314] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161719]">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                SahakarGig Cooperative Economics & Pricing Matrix
              </h3>
              <p className="text-[11px] text-zinc-400">
                Transparent comparison vs. Corporate Aggregators (Code on Social Security 2020)
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPricingModalOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Comparison Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
              1. Platform Structural Comparison
            </h4>
            <div className="border border-white/10 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#161719] text-zinc-400 font-mono text-[11px] border-b border-white/10">
                  <tr>
                    <th className="p-3">Operational Parameter</th>
                    <th className="p-3 text-rose-400">Corporate Aggregators (e.g. UC)</th>
                    <th className="p-3 text-emerald-400 bg-emerald-950/20">SahakarGig Co-op (NLCF)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  <tr>
                    <td className="p-3 font-semibold text-white">Primary Ownership</td>
                    <td className="p-3 text-zinc-400">Venture Capitalists & Corporate Shareholders</td>
                    <td className="p-3 text-emerald-300 font-medium bg-emerald-950/10">
                      Democratic Control by Labour Societies & Artisans
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Commission Cut per Job</td>
                    <td className="p-3 text-rose-300 font-mono">20% to 35% Deducted from Worker</td>
                    <td className="p-3 text-emerald-400 font-mono font-bold bg-emerald-950/10">
                      5% to 8% Flat Platform Fee (Zero profit gouging)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Worker Take-Home Share</td>
                    <td className="p-3 text-zinc-400 font-mono">65% – 80%</td>
                    <td className="p-3 text-emerald-400 font-mono font-bold bg-emerald-950/10">
                      92.0% Direct UPI Instant Bank Settlement
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Accident & Pension Safety Net</td>
                    <td className="p-3 text-zinc-400">
                      <span className="text-rose-400">✘ None / Optional paid addons</span>
                    </td>
                    <td className="p-3 text-emerald-300 bg-emerald-950/10 font-medium">
                      ✓ Built-in 6% automated e-Shram Welfare Locker
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Price Transparency</td>
                    <td className="p-3 text-zinc-400">Surge pricing & algorithmic markups</td>
                    <td className="p-3 text-emerald-300 bg-emerald-950/10 font-medium">
                      State Labour Minimum Wage Board Fixed Baselines
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Non-Smartphone Worker Access</td>
                    <td className="p-3 text-zinc-400">Excluded (Smartphone required)</td>
                    <td className="p-3 text-emerald-300 bg-emerald-950/10 font-medium">
                      Physical Labour Felicitation Centres (LFC) + Printed Tickets
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pricing Catalog Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
              2. Fair Wage Catalog (Sample Baseline Rates in Maharashtra)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="p-3 bg-[#161719] border border-white/5 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl p-1 bg-[#121314] rounded-lg border border-white/5">
                      {s.icon}
                    </span>
                    <div>
                      <h5 className="font-semibold text-white">{s.name}</h5>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {s.govWageStandard}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-400 font-mono">₹{s.baseWage}</span>
                    <span className="text-[10px] text-zinc-500 block">{s.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code on Social Security 2020 Note */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/30 to-blue-950/30 border border-emerald-500/30 text-xs text-zinc-300 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Compliance with India's Code on Social Security (2020)</span>
            </div>
            <p className="text-[11px] text-zinc-300 leading-relaxed">
              Every job processed through SahakarGig automatically routes statutory contributions into the worker’s e-Shram Universal Account Number (UAN), providing coverage for Pradhan Mantri Suraksha Bima Yojana (PMSBY), Ayushman Bharat PM-JAY medical coverage, and old-age retirement corpus.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#161719] flex justify-end">
          <button
            onClick={() => setIsPricingModalOpen(false)}
            className="px-5 py-1.5 text-xs font-bold text-black bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
