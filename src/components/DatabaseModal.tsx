"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import {
  Database,
  X,
  RefreshCw,
  Table,
  CheckCircle2,
  FileCode,
  Layers,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const DatabaseModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { bookings, workers, services, reseedDatabase, financialMetrics } = useApp();
  const [activeTab, setActiveTab] = useState<"bookings" | "workers" | "services" | "welfare" | "schema">(
    "bookings"
  );
  const [isReseeding, setIsReseeding] = useState(false);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetch("/api/analytics")
        .then((res) => res.json())
        .then((json) => {
          if (json.data && json.data.recentLogs) {
            setAuditLogs(json.data.recentLogs);
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleReseed = async () => {
    setIsReseeding(true);
    await reseedDatabase();
    setIsReseeding(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-[#121314] border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161719]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40 text-emerald-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">
                  SQLite Relational Database & Backend Ledger
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  PERSISTENT ON DISK (`data/sahakargig.db`)
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Direct statutory SQL ledger matching Code on Social Security 2020
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReseed}
              disabled={isReseeding}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition-colors shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isReseeding ? "animate-spin" : ""}`} />
              <span>{isReseeding ? "Reseeding..." : "Reseed Database (POST /api/seed)"}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Database Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-white/10 bg-[#161719]/50 overflow-x-auto text-xs">
          {[
            { id: "bookings", label: `bookings (${bookings.length})` },
            { id: "workers", label: `workers (${workers.length})` },
            { id: "services", label: `services (${services.length})` },
            { id: "welfare", label: `welfare_ledgers (e-Shram)` },
            { id: "schema", label: `audit_logs & SQL Schema` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 font-mono text-xs rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-[#121314] text-emerald-400 font-bold border-t-2 border-emerald-400"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Database Table Viewer */}
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
          {activeTab === "bookings" && (
            <div className="border border-white/10 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left font-mono text-[11px]">
                <thead className="bg-[#161719] text-zinc-400 border-b border-white/10">
                  <tr>
                    <th className="p-2.5">id</th>
                    <th className="p-2.5">serviceName</th>
                    <th className="p-2.5">customer</th>
                    <th className="p-2.5">area</th>
                    <th className="p-2.5">baseAmount</th>
                    <th className="p-2.5 text-emerald-400">workerPayout (92%)</th>
                    <th className="p-2.5 text-blue-400">welfare (6%)</th>
                    <th className="p-2.5">otpCode</th>
                    <th className="p-2.5">status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-white/5">
                      <td className="p-2.5 font-bold text-white">{b.id}</td>
                      <td className="p-2.5 text-zinc-200">{b.serviceName}</td>
                      <td className="p-2.5">{b.customerName}</td>
                      <td className="p-2.5 text-zinc-400 truncate max-w-[120px]">{b.area}</td>
                      <td className="p-2.5">₹{b.baseAmount}</td>
                      <td className="p-2.5 text-emerald-400 font-bold">₹{b.workerPayout}</td>
                      <td className="p-2.5 text-blue-400 font-bold">₹{b.welfareLocker}</td>
                      <td className="p-2.5 text-amber-300 font-bold">{b.otpCode}</td>
                      <td className="p-2.5">
                        <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "workers" && (
            <div className="border border-white/10 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left font-mono text-[11px]">
                <thead className="bg-[#161719] text-zinc-400 border-b border-white/10">
                  <tr>
                    <th className="p-2.5">id / workerId</th>
                    <th className="p-2.5">name</th>
                    <th className="p-2.5">trade</th>
                    <th className="p-2.5">eShramCardNo (UAN)</th>
                    <th className="p-2.5 text-emerald-400">todayEarnings</th>
                    <th className="p-2.5 text-blue-400">todayWelfareSaved</th>
                    <th className="p-2.5">status</th>
                    <th className="p-2.5">device</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {workers.map((w) => (
                    <tr key={w.id} className="hover:bg-white/5">
                      <td className="p-2.5 font-bold text-white">{w.workerId}</td>
                      <td className="p-2.5 text-zinc-200">{w.name}</td>
                      <td className="p-2.5 text-emerald-300">{w.trade}</td>
                      <td className="p-2.5 text-zinc-400">{w.eShramCardNo}</td>
                      <td className="p-2.5 text-emerald-400 font-bold">₹{w.todayEarnings}</td>
                      <td className="p-2.5 text-blue-400 font-bold">₹{w.todayWelfareSaved}</td>
                      <td className="p-2.5">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px]">
                          {w.status}
                        </span>
                      </td>
                      <td className="p-2.5 text-zinc-400">
                        {w.hasSmartphone ? "Smartphone" : "LFC Walk-in"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "services" && (
            <div className="border border-white/10 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left font-mono text-[11px]">
                <thead className="bg-[#161719] text-zinc-400 border-b border-white/10">
                  <tr>
                    <th className="p-2.5">id</th>
                    <th className="p-2.5">name</th>
                    <th className="p-2.5">category</th>
                    <th className="p-2.5 text-emerald-400">baseWage</th>
                    <th className="p-2.5">unit</th>
                    <th className="p-2.5">govWageStandard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {services.map((s) => (
                    <tr key={s.id} className="hover:bg-white/5">
                      <td className="p-2.5 font-bold text-white">{s.id}</td>
                      <td className="p-2.5 text-zinc-200">{s.icon} {s.name}</td>
                      <td className="p-2.5 uppercase text-[10px] text-zinc-400">{s.category}</td>
                      <td className="p-2.5 text-emerald-400 font-bold">₹{s.baseWage}</td>
                      <td className="p-2.5 text-zinc-400">{s.unit}</td>
                      <td className="p-2.5 text-zinc-400">{s.govWageStandard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "welfare" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/30 to-emerald-950/30 border border-blue-500/30 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-zinc-400 block">TOTAL WELFARE ALLOCATED IN SQLITE TRUST</span>
                  <span className="text-2xl font-bold text-emerald-400">
                    ₹{financialMetrics.welfareLockerTotal}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-400 block">STATUTORY ACT</span>
                  <span className="text-blue-300 font-bold">Code on Social Security 2020</span>
                </div>
              </div>

              <div className="p-3 bg-[#161719] rounded-xl border border-white/5 text-xs text-zinc-300 space-y-2">
                <p>
                  Every completed booking automatically writes a transaction into the <code className="text-emerald-400">welfare_ledgers</code> table, depositing 6% of the customer invoice into the artisan's e-Shram account for PMSBY and Ayushman Bharat medical security.
                </p>
              </div>
            </div>
          )}

          {activeTab === "schema" && (
            <div className="space-y-4">
              <div className="p-3.5 bg-[#161719] rounded-xl border border-white/5">
                <h4 className="text-xs font-bold text-white font-mono mb-2">
                  Live Audit Logs (`audit_logs` table in SQLite)
                </h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto font-mono text-[11px]">
                  {auditLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded bg-[#121314] border border-white/5 flex items-start justify-between gap-2"
                    >
                      <div>
                        <span className="text-emerald-400 font-bold">[{log.eventType}]</span>{" "}
                        <span className="text-zinc-300">{log.description}</span>
                      </div>
                      <span className="text-zinc-500 shrink-0 text-[10px]">{log.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-[#161719] rounded-xl border border-white/5 font-mono text-[11px] text-zinc-400 space-y-1">
                <span className="text-white font-bold block">Available Backend API Endpoints:</span>
                <p>• <code>GET /api/services</code> — Service catalog with wage baselines</p>
                <p>• <code>GET, POST /api/workers</code> — Worker registry & Aadhaar e-KYC</p>
                <p>• <code>GET, POST /api/bookings</code> — Bookings list & 92% UPI split creation</p>
                <p>• <code>PATCH /api/bookings/[id]</code> — Job acceptance, OTP verify, and UPI completion</p>
                <p>• <code>POST /api/voice</code> — Sovereign Bhashini AI NLP intent classifier</p>
                <p>• <code>GET /api/forecasting</code> — ML demand regression trends</p>
                <p>• <code>GET /api/analytics</code> — Real-time financial split ledger</p>
                <p>• <code>POST /api/seed</code> — Database reseed endpoint</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#161719] flex justify-between items-center text-xs">
          <span className="font-mono text-zinc-500">
            Database Engine: SQLite3 (Local Persistent File Storage)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
