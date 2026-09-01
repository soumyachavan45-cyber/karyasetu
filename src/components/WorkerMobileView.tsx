"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Smartphone,
  Sun,
  ShieldCheck,
  Zap,
  Phone,
  Navigation,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Clock,
  MapPin,
  Mic,
  MessageSquare,
  BadgeIndianRupee,
  Award,
  Calendar,
  Check,
} from "lucide-react";
import { formatINR } from "@/lib/utils";
import confetti from "canvas-confetti";

export const WorkerMobileView: React.FC = () => {
  const {
    currentWorker,
    updateWorkerStatus,
    incomingJobAlert,
    acceptJob,
    declineJob,
    verifyJobOtp,
    completeJob,
    outdoorMode,
    setOutdoorMode,
    language,
    setIsVoiceModalOpen,
    setIsChatOpen,
    setIsReviewOpen,
    bookings,
  } = useApp();

  const [enteredOtp, setEnteredOtp] = useState("");
  const [activeJobStep, setActiveJobStep] = useState<"idle" | "en_route" | "in_progress" | "settled">("idle");
  const [activeBooking, setActiveBooking] = useState<any>(null);

  // Filter today's completed jobs for daily earnings ledger
  const todayCompletedJobs = bookings.filter((b) => b.status === "completed" || b.status === "otp_verified");

  const handleAcceptJob = async () => {
    if (!incomingJobAlert) return;
    const job = incomingJobAlert;
    setActiveBooking(job);
    await acceptJob(job.id);
    setActiveJobStep("en_route");
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBooking) return;
    const ok = await verifyJobOtp(activeBooking.id, enteredOtp);
    if (ok) {
      setActiveJobStep("in_progress");
      setEnteredOtp("");
    }
  };

  const handleCompleteJob = async () => {
    if (!activeBooking) return;
    await completeJob(activeBooking.id);
    setActiveJobStep("settled");

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {}

    // Open review modal for testing / rating
    setTimeout(() => {
      setIsReviewOpen(true);
    }, 1500);
  };

  return (
    <div
      className={`w-full max-w-md mx-auto min-h-[calc(100vh-4rem)] p-3.5 sm:p-4 space-y-4 pb-20 transition-colors ${
        outdoorMode ? "bg-amber-100 text-slate-950" : "text-slate-900"
      }`}
    >
      {/* 1. Top Header & Sun Mode Toggle */}
      <div
        className={`p-4 rounded-3xl border flex items-center justify-between shadow-glass ${
          outdoorMode
            ? "bg-amber-200 border-amber-400 text-black shadow-md"
            : "glass-panel border-white/90"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-xl font-bold text-emerald-800 shadow-xs">
              {currentWorker.name.charAt(0)}
            </div>
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                currentWorker.status === "available"
                  ? "bg-emerald-500"
                  : "bg-amber-500"
              }`}
            />
          </div>

          <div>
            <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
              <span>{currentWorker.name}</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </h2>
            <p className="text-xs text-emerald-700 font-bold">{currentWorker.trade}</p>
            <p className="text-[10px] font-mono text-slate-500">{currentWorker.societyName}</p>
          </div>
        </div>

        {/* Outdoor High-Glare Sun Mode Toggle */}
        <button
          onClick={() => setOutdoorMode(!outdoorMode)}
          className={`p-2.5 rounded-2xl border transition-all ${
            outdoorMode
              ? "bg-amber-400 text-black border-black font-bold shadow-md"
              : "bg-white/90 text-amber-600 border-slate-200 hover:border-amber-400 shadow-2xs"
          }`}
          title="Toggle High-Contrast Outdoor Sun Mode for Field Visibility"
        >
          <Sun className="w-5 h-5" />
        </button>
      </div>

      {/* 2. Duty Mode Switcher */}
      <div
        className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
          outdoorMode
            ? "bg-amber-200 border-amber-400 text-black"
            : "glass-card border-white/90 shadow-2xs"
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              currentWorker.status === "available"
                ? "bg-emerald-500 animate-pulse"
                : "bg-slate-400"
            }`}
          />
          <span className="font-bold text-slate-800">
            Duty Status:{" "}
            <span className="uppercase text-emerald-700 font-black">{currentWorker.status}</span>
          </span>
        </div>

        <button
          onClick={() =>
            updateWorkerStatus(
              currentWorker.id,
              currentWorker.status === "available" ? "offline" : "available"
            )
          }
          className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all shadow-xs ${
            currentWorker.status === "available"
              ? "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
              : "btn-glossy-green text-white"
          }`}
        >
          {currentWorker.status === "available" ? "Go Offline" : "Go On-Duty"}
        </button>
      </div>

      {/* 3. DAILY EARNINGS & E-SHRAM SOCIAL SECURITY TRACKER */}
      <div
        className={`p-4 sm:p-5 rounded-3xl border space-y-3.5 ${
          outdoorMode
            ? "bg-amber-50 border-amber-400 text-black"
            : "glass-panel border-white/90 shadow-glass"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-extrabold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            Today's Daily Earnings Ledger
          </span>
          <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 font-semibold">
            <Calendar className="w-3 h-3" />
            {new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div
            className={`p-3.5 rounded-2xl border ${
              outdoorMode
                ? "bg-white border-amber-300"
                : "bg-white/90 border-emerald-200 shadow-2xs"
            }`}
          >
            <span className="text-[10px] text-slate-500 block font-mono font-bold">92% Direct Take-Home</span>
            <div className="text-xl sm:text-2xl font-black font-mono text-emerald-700">
              {formatINR(currentWorker.todayEarnings)}
            </div>
            <span className="text-[9px] text-emerald-700 font-mono font-semibold">Instant UPI Settled</span>
          </div>

          <div
            className={`p-3.5 rounded-2xl border ${
              outdoorMode
                ? "bg-white border-amber-300"
                : "bg-white/90 border-blue-200 shadow-2xs"
            }`}
          >
            <span className="text-[10px] text-slate-500 block font-mono font-bold">6% e-Shram Pension</span>
            <div className="text-xl sm:text-2xl font-black font-mono text-blue-700">
              {formatINR(currentWorker.todayWelfareSaved)}
            </div>
            <span className="text-[9px] text-blue-700 font-mono font-semibold">UAN Trust Locked</span>
          </div>
        </div>

        {/* Lifetime Stats & Guild Recognition */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-[11px] text-slate-600 font-mono">
          <span>Total Jobs Completed: <strong className="text-slate-900 font-bold">{currentWorker.totalJobs}</strong></span>
          <span>Rating: <strong className="text-amber-600 font-bold">⭐ {currentWorker.rating} / 5.0</strong></span>
        </div>
      </div>

      {/* 4. FLASHING NEW JOB ALERT (IF RECEIVED) */}
      {incomingJobAlert && activeJobStep === "idle" && (
        <div className="p-5 rounded-3xl glass-card border-2 border-emerald-400 bg-white/95 shadow-2xl space-y-4 animate-in zoom-in-95">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 animate-pulse">
              <Zap className="w-3.5 h-3.5 fill-emerald-600 text-emerald-700" />
              NEW WORK REQUEST RECEIVED!
            </span>
            <span className="text-xs font-mono text-slate-600 font-bold">2.1 km away</span>
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900">{incomingJobAlert.serviceName}</h3>
            <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{incomingJobAlert.area}</span>
            </p>
            {incomingJobAlert.notes && (
              <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200 mt-2 italic font-medium">
                "{incomingJobAlert.notes}"
              </p>
            )}
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-slate-500 block font-mono font-bold">Your 92% Payout:</span>
              <strong className="text-base font-black font-mono text-emerald-700">
                {formatINR(incomingJobAlert.workerPayout)}
              </strong>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 block font-mono font-bold">+ 6% e-Shram Pension:</span>
              <span className="font-mono text-blue-700 font-bold">{formatINR(incomingJobAlert.welfareLocker)}</span>
            </div>
          </div>

          {/* Large Touch Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleAcceptJob}
              className="py-3.5 rounded-2xl btn-glossy-green text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95"
            >
              <Check className="w-5 h-5 stroke-[3]" />
              <span>ACCEPT JOB</span>
            </button>

            <button
              onClick={() => declineJob(incomingJobAlert.id)}
              className="py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-colors"
            >
              DECLINE
            </button>
          </div>
        </div>
      )}

      {/* 5. ACTIVE JOB LIFECYCLE (EN-ROUTE / ON-SITE OTP / COMPLETION) */}
      {activeJobStep !== "idle" && activeBooking && (
        <div className="p-5 rounded-3xl glass-card border-2 border-emerald-400 bg-white/95 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <span className="text-[10px] font-mono text-emerald-700 uppercase font-bold block">
                ACTIVE JOB DISPATCH
              </span>
              <h3 className="text-sm font-bold text-slate-900">{activeBooking.serviceName}</h3>
            </div>

            <button
              onClick={() => setIsChatOpen(true)}
              className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
              title="Chat with Customer"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 text-xs text-slate-700">
            <p>Customer: <strong className="text-slate-900 font-bold">{activeBooking.customerName}</strong></p>
            <p>Phone: <strong className="text-blue-700 font-mono font-bold">{activeBooking.customerPhone}</strong></p>
            <p>Address: <span className="text-slate-600 font-medium">{activeBooking.area}</span></p>
          </div>

          {/* En-Route Step: Ask for OTP */}
          {activeJobStep === "en_route" && (
            <form onSubmit={handleVerifyOtp} className="space-y-3 pt-2">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <label className="block text-slate-800 font-bold text-xs">
                  Ask Customer for 4-Digit Job OTP
                </label>
                <input
                  type="text"
                  maxLength={4}
                  required
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  placeholder="e.g. 5912 or 1234"
                  className="w-full bg-white border border-emerald-400 rounded-xl p-2.5 text-slate-900 font-mono tracking-widest text-center text-base focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-bold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl btn-glossy-green text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-95"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify OTP & Commence Work</span>
              </button>
            </form>
          )}

          {/* In-Progress Step: Complete Job */}
          {activeJobStep === "in_progress" && (
            <div className="space-y-3 pt-2">
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-1">
                <span className="text-xs font-bold text-emerald-900">
                  ⚡ Work In Progress on Site
                </span>
                <p className="text-[10px] text-slate-600">
                  Timer started. Complete the work and trigger instant UPI 92% payout settlement.
                </p>
              </div>

              <button
                onClick={handleCompleteJob}
                className="w-full py-3.5 rounded-2xl btn-glossy-green text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                <span>COMPLETE JOB & CLAIM ₹{activeBooking.workerPayout} (UPI)</span>
              </button>
            </div>
          )}

          {/* Settled Step */}
          {activeJobStep === "settled" && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-emerald-950">Instant UPI Settlement Complete!</h4>
              <p className="text-xs text-emerald-800 font-mono font-bold">
                + ₹{activeBooking.workerPayout} credited to your UPI ID ({currentWorker.upiId})
              </p>
              <button
                onClick={() => {
                  setActiveJobStep("idle");
                  setActiveBooking(null);
                }}
                className="mt-2 px-4 py-2 rounded-xl btn-glossy-blue text-white text-xs font-bold shadow-xs"
              >
                Ready for Next Work
              </button>
            </div>
          )}
        </div>
      )}

      {/* 6. Bhashini AI Multilingual Voice Action Trigger */}
      <div className="pt-2">
        <button
          onClick={() => setIsVoiceModalOpen(true)}
          className="w-full py-3 px-4 rounded-2xl bg-white/90 border border-blue-200 text-blue-700 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs hover:bg-blue-50"
        >
          <Mic className="w-4 h-4 text-blue-600 animate-pulse" />
          <span>🎙️ Bhashini Voice Assistant (Hindi / Marathi / English)</span>
        </button>
      </div>
    </div>
  );
};

