"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Smartphone,
  Mic,
  Star,
  MapPin,
  Check,
  X,
  ShieldCheck,
  Zap,
  Lock,
  Sun,
  Moon,
  Volume2,
  Navigation,
  Sparkles,
  Phone,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Radio,
} from "lucide-react";
import { formatINR } from "@/lib/utils";
import confetti from "canvas-confetti";

export const WorkerMobileView: React.FC = () => {
  const {
    currentWorker,
    incomingJobAlert,
    acceptJob,
    declineJob,
    verifyJobOtp,
    completeJob,
    bookings,
    updateWorkerStatus,
    setIsVoiceModalOpen,
    language,
    t,
    outdoorMode,
    setOutdoorMode,
    speakText,
  } = useApp();

  const [otpInput, setOtpInput] = useState("");
  const [activeJobStep, setActiveJobStep] = useState<"alert" | "in_transit" | "working" | "done">("alert");

  // Find if current worker has an active job in progress
  const activeJob = bookings.find(
    (b) =>
      b.assignedWorker?.id === currentWorker.id &&
      (b.status === "in_transit" || b.status === "otp_verified")
  );

  const handleAccept = async (bookingId: string) => {
    await acceptJob(bookingId);
    setActiveJobStep("in_transit");
  };

  const handleVerifyOtp = async (bookingId: string) => {
    const success = await verifyJobOtp(bookingId, otpInput);
    if (success) {
      setActiveJobStep("working");
    }
  };

  const handleCompleteJob = async (bookingId: string) => {
    await completeJob(bookingId);
    setActiveJobStep("done");

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // safe fallback
    }
  };

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start p-4 sm:p-6 transition-colors duration-300 ${
        outdoorMode ? "outdoor-mode bg-black" : "bg-[#0B0B0C]"
      }`}
    >
      {/* Top Banner with Controls */}
      <div className="w-full max-w-sm mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          <Smartphone className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-white">Artisan Mobile Web Portal</span>
        </div>

        {/* Outdoor High-Contrast Sun Mode Toggle */}
        <button
          onClick={() => setOutdoorMode(!outdoorMode)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
            outdoorMode
              ? "bg-white text-black font-bold"
              : "bg-[#161719] text-zinc-300 border border-white/10 hover:border-emerald-500/40"
          }`}
          title="Toggle High Contrast Low-Glare Outdoor Mode for Bright Sunlight"
        >
          {outdoorMode ? (
            <>
              <Sun className="w-3.5 h-3.5 fill-black" />
              <span>Sun Mode (Active)</span>
            </>
          ) : (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Outdoor Mode</span>
            </>
          )}
        </button>
      </div>

      {/* MOBILE PHONE CHASSIS WRAPPER */}
      <div
        className={`relative w-full max-w-sm rounded-[36px] p-4 shadow-2xl border ${
          outdoorMode
            ? "bg-black border-2 border-emerald-500 shadow-emerald-500/20"
            : "bg-[#121314] border-white/10 shadow-2xl shadow-black/90"
        } flex flex-col space-y-4 pb-20`}
      >
        {/* Notch / Status Bar */}
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 px-2">
          <span>09:41 AM</span>
          <div className="w-20 h-4 rounded-full bg-black border border-white/5 mx-auto" />
          <div className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold">5G • NCD</span>
          </div>
        </div>

        {/* 1. WORKER PROFILE HEADER */}
        <div
          className={`p-3.5 rounded-2xl ${
            outdoorMode ? "bg-[#111111] border border-white/20" : "bg-[#161719] border border-white/5"
          } flex items-center justify-between`}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={currentWorker.photoUrl}
                alt={currentWorker.name}
                className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-500/60 shadow"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#161719] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white">
                  {language === "hi"
                    ? currentWorker.nameHi
                    : language === "mr"
                    ? currentWorker.nameMr
                    : currentWorker.name}
                </h3>
                <span className="text-[10px] font-mono text-zinc-400">
                  {currentWorker.workerId}
                </span>
              </div>
              <p className="text-xs text-emerald-400 font-medium">
                {language === "hi"
                  ? currentWorker.tradeHi
                  : language === "mr"
                  ? currentWorker.tradeMr
                  : currentWorker.trade}
              </p>
              <div className="flex items-center gap-2 mt-0.5 text-[10px] text-zinc-400">
                <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                  <Star className="w-3 h-3 fill-amber-400" /> {currentWorker.rating}
                </span>
                <span>•</span>
                <span>{currentWorker.totalJobs} Jobs</span>
              </div>
            </div>
          </div>

          {/* Duty Mode Switch */}
          <div className="flex flex-col items-end gap-1">
            <button
              onClick={() =>
                updateWorkerStatus(
                  currentWorker.id,
                  currentWorker.status === "available" ? "offline" : "available"
                )
              }
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-tight transition-all ${
                currentWorker.status === "available"
                  ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/30"
                  : "bg-zinc-800 text-zinc-400 border border-white/10"
              }`}
            >
              {currentWorker.status === "available" ? "📶 Active" : "⏸ Offline"}
            </button>
            <span className="text-[9px] font-mono text-zinc-500">ISRO Radar</span>
          </div>
        </div>

        {/* 2. MAIN ALERT BOX / CURRENT JOB SUMMARY */}
        {incomingJobAlert && !activeJob && (
          <div
            className={`p-4 rounded-2xl border-2 animate-in slide-in-from-top-2 ${
              outdoorMode
                ? "bg-[#151515] border-emerald-400 shadow-xl"
                : "bg-gradient-to-b from-emerald-950/40 to-[#121314] border-emerald-500/60 shadow-2xl shadow-emerald-500/20"
            } space-y-3.5`}
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-black animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-black" />
                {t.newJobRequest}
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                {incomingJobAlert.timestamp}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-start gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">{incomingJobAlert.area}</span>
                  <span className="text-[10px] text-zinc-400 block">
                    (Distance: 2.1 km away • Dighori Hub)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-zinc-300 pt-1">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium">{incomingJobAlert.serviceName}</span>
                  <p className="text-[10px] text-zinc-400">{incomingJobAlert.notes}</p>
                </div>
              </div>
            </div>

            {/* Payout to wallet highlight */}
            <div className="p-2.5 rounded-xl bg-[#0B0B0C] border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-400 block font-mono">
                  {t.payoutToWallet}
                </span>
                <span className="text-base font-black font-mono text-emerald-400">
                  {formatINR(incomingJobAlert.workerPayout)}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                92% Instant UPI
              </span>
            </div>

            {/* Oversized Big Hit Area Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => declineJob(incomingJobAlert.id)}
                className="py-3 rounded-xl text-xs font-bold bg-rose-950/40 text-rose-300 border border-rose-500/40 hover:bg-rose-900/60 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <X className="w-4 h-4" />
                <span>{t.decline}</span>
              </button>

              <button
                onClick={() => handleAccept(incomingJobAlert.id)}
                className="py-3 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-500 to-teal-400 text-black hover:from-emerald-400 hover:to-teal-300 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/30"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>{t.accept}</span>
              </button>
            </div>
          </div>
        )}

        {/* ACTIVE IN-TRANSIT & WORK IN PROGRESS COMPONENT */}
        {activeJob && (
          <div className="p-4 rounded-2xl bg-[#161719] border border-emerald-500/50 space-y-3.5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Navigation className="w-4 h-4 animate-bounce text-emerald-400" />
                {activeJob.status === "in_transit" ? "En-Route to Customer" : "Job In Progress ⚡"}
              </span>
              <span className="text-[10px] font-mono text-zinc-400">{activeJob.id}</span>
            </div>

            <div className="p-3 bg-[#121314] rounded-xl border border-white/5 space-y-1 text-xs">
              <p className="font-bold text-white">{activeJob.customerName}</p>
              <p className="text-zinc-400 text-[11px]">{activeJob.area}</p>
              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="text-emerald-400 font-mono">
                  Wallet Payout: {formatINR(activeJob.workerPayout)}
                </span>
                <a
                  href={`tel:${activeJob.customerPhone}`}
                  className="flex items-center gap-1 text-zinc-300 hover:text-white px-2 py-0.5 rounded bg-white/5"
                >
                  <Phone className="w-3 h-3 text-emerald-400" /> Call
                </a>
              </div>
            </div>

            {/* If In Transit: Require OTP to start */}
            {activeJob.status === "in_transit" && (
              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-zinc-300">
                  Ask Customer for 4-Digit Security OTP:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={4}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    placeholder="e.g. 4921"
                    className="flex-1 bg-[#121314] border border-white/20 rounded-xl px-3 py-2 text-center text-sm font-mono tracking-widest text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={() => handleVerifyOtp(activeJob.id)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-black hover:bg-emerald-400 active:scale-95 transition-all"
                  >
                    Verify & Start
                  </button>
                </div>
              </div>
            )}

            {/* If Working: Complete Job button */}
            {activeJob.status === "otp_verified" && (
              <div className="space-y-2 pt-1">
                <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Aadhaar OTP Verified. Work in progress.</span>
                </div>
                <button
                  onClick={() => handleCompleteJob(activeJob.id)}
                  className="w-full py-3 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-500 to-teal-400 text-black hover:from-emerald-400 hover:to-teal-300 shadow-xl shadow-emerald-500/30 active:scale-95 transition-all"
                >
                  ✅ Work Completed (Settle ₹{activeJob.workerPayout} via UPI)
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3. QUICK WALLET & WELFARE BREAKDOWN */}
        <div
          className={`p-4 rounded-2xl ${
            outdoorMode ? "bg-[#111111] border border-white/20" : "bg-[#161719] border border-white/5"
          } space-y-3`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              {t.todaysEarnings}
            </span>
            <span className="text-base font-black font-mono text-white">
              {formatINR(currentWorker.todayEarnings)}
            </span>
          </div>

          {/* e-Shram Social Security Status Card */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-950/40 to-emerald-950/40 border border-blue-500/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1">
                <Lock className="w-3 h-3 text-blue-400" />
                {t.socialSecurityStatus}
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500 text-black font-mono">
                {t.fullySecured}
              </span>
            </div>
            <p className="text-[10px] text-zinc-300 leading-snug">
              ₹{currentWorker.todayWelfareSaved} {t.allocatedToday} (PMSBY & Ayushman Bharat).
            </p>
          </div>
        </div>

        {/* 4. FLOATING BHASHINI AI VOICE BUTTON */}
        <div className="pt-2">
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className="w-full group py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-95 transition-all"
          >
            <Mic className="w-4 h-4 fill-black group-hover:animate-bounce" />
            <span>{t.tapToSpeak}</span>
          </button>
          <span className="text-[10px] text-zinc-500 text-center block mt-1 font-mono">
            "माझे पुढचे काम कुठे आहे?" / "अगला काम बताओ"
          </span>
        </div>
      </div>
    </div>
  );
};
