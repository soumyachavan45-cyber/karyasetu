"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { X, Check, ShieldAlert, Sparkles, Building2, HeartHandshake, ShieldCheck } from "lucide-react";

export const PricingMatrixModal: React.FC = () => {
  const { isPricingModalOpen, setIsPricingModalOpen, language } = useApp();

  if (!isPricingModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in font-sans">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                KaryaSetu Fair Wage Architecture & Economics
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Transparent comparison vs. Corporate Aggregators (Code on Social Security 2020)
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPricingModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Comparison Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              1. Platform Structural Comparison
            </h4>
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 font-semibold text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="p-3">Operational Parameter</th>
                    <th className="p-3 text-rose-600">Corporate Aggregators (e.g. UC)</th>
                    <th className="p-3 text-emerald-700 bg-emerald-50">KaryaSetu Public Rail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Primary Ownership</td>
                    <td className="p-3 text-slate-500">Corporate Shareholders / VC Intermediaries</td>
                    <td className="p-3 text-emerald-900 font-medium bg-emerald-50/40">
                      Democratic Control by Primary Labour Societies & Artisans
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Platform Commission Cut</td>
                    <td className="p-3 text-rose-600 font-mono font-bold">25% - 35% extracted</td>
                    <td className="p-3 text-emerald-700 font-mono font-bold bg-emerald-50/40">
                      0% Profit Extraction (92% direct to worker)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Worker Payout Timing</td>
                    <td className="p-3 text-slate-500">Weekly/Bi-weekly payouts after clawbacks</td>
                    <td className="p-3 text-emerald-900 font-medium bg-emerald-50/40">
                      Instant direct UPI transfer on customer OTP sign-off
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Social Security & Welfare</td>
                    <td className="p-3 text-slate-500">Zero formal statutory pension or health lock</td>
                    <td className="p-3 text-emerald-900 font-medium bg-emerald-50/40">
                      Automated 6% e-Shram PMSBY accident + retirement pension
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Surge Pricing Gouging</td>
                    <td className="p-3 text-slate-500">Algorithmic surge multiplier during rain/peak</td>
                    <td className="p-3 text-emerald-900 font-medium bg-emerald-50/40">
                      Strict Zero Surge policy; State Minimum Wage Board aligned
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Code on Social Security 2020 statutory badge */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-blue-900 font-bold block">
                Statutory Code on Social Security 2020 Aligned
              </strong>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                By routing transparently through national cooperative federations, KaryaSetu protects India's unorganized workforce with health, accident, and pension reserves on every single transaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
