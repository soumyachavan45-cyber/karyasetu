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
  Volume2,
  Navigation,
  Sparkles,
  Phone,
  CheckCircle2,
  AlertCircle,
  Radio,
  BadgeIndianRupee,
  Award,
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
    speakText,
  } = useApp();

  const [otpInput, setOtpInput] = useState("");

  // Find if current worker has an active job in progress
  const activeJob = bookings.find(
    (b) =>
      b.assignedWorker?.id === currentWorker.id &&
      (b.status === "in_transit" || b.status === "otp_verified")
  );

  const handleAccept = async (bookingId: string) => {
    await acceptJob(bookingId);
  };

  const handleVerifyOtp = async (bookingId: string) => {
    if (!otpInput) return;
    const success = await verifyJobOtp(bookingId, otpInput);
    if (success) {
      setOtpInput("");
    }
  };

  const handleComplete = async (bookingId: string) => {
    await completeJob(bookingId);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {}
  };

  return (
    <div className="w-full min-h-screen bg-transparent text-slate-900 pb-24 pt-6 font-sans">
      <div className="max-w-md mx-auto px-4 space-y-5">

        
        {/* WORKER SMARTPHONE CHASSIS HEADER */}
        <div className="glass-panel p-5 rounded-3xl border border-white shadow-glass space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={currentWorker.photoUrl}
                  alt={currentWorker.name}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm"
                />
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                    currentWorker.status === "available"
                      ? "bg-emerald-500"
                      : currentWorker.status === "busy"
                      ? "bg-amber-500"
                      : "bg-slate-400"
                  }`}
                />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {currentWorker.name}
                  </h2>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    ★ {currentWorker.rating}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  {currentWorker.trade} • {currentWorker.experienceYears} Yrs Exp
                </p>
              </div>
            </div>

            {/* Voice Assistant Mic Button */}
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300 flex items-center justify-center transition-colors shadow-sm"
              title="Voice Assistant (Bhashini AI)"
            >
              <Mic className="w-5 h-5 animate-pulse text-emerald-600" />
            </button>
          </div>

          {/* Status Toggle Bar */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs">
            {(["available", "busy", "offline"] as const).map((st) => (
              <button
                key={st}
                onClick={() => updateWorkerStatus(currentWorker.id, st)}
                className={`py-1.5 rounded-xl font-bold text-[11px] capitalize transition-all ${
                  currentWorker.status === st
                    ? st === "available"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : st === "busy"
                      ? "bg-amber-500 text-white shadow-sm"
                      : "bg-slate-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {st}
              </button>
            ))}
          </div>


          {/* e-Shram & Sovereign Badges */}
          <div className="flex items-center justify-between pt-1 text-[11px] text-slate-600">
            <span className="flex items-center gap-1 font-mono font-semibold text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{currentWorker.uanNumber || currentWorker.eShramCardNo}</span>
            </span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Aadhaar e-KYC
            </span>
          </div>
        </div>


        {/* EARNINGS SUMMARY CARDS */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-panel p-4 rounded-3xl border border-white shadow-card-soft space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Today's Take-Home
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
              ₹{currentWorker.todayEarnings}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block">
              92% Direct UPI Payout
            </span>
          </div>

          <div className="glass-panel p-4 rounded-3xl border border-white shadow-card-soft space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              e-Shram Pension Locked
            </span>
            <div className="text-xl sm:text-2xl font-black text-blue-600 font-mono">
              ₹{currentWorker.todayWelfareSaved}
            </div>
            <span className="text-[10px] text-blue-600 font-semibold block">
              PMSBY + Retirement Trust
            </span>
          </div>
        </div>

        {/* INCOMING LEAD POPUP / ALERT */}
        {incomingJobAlert && !activeJob && (
          <div className="glass-panel p-5 rounded-3xl border-2 border-blue-400 bg-white/95 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <strong className="text-sm font-extrabold text-slate-900">
                  New Direct Booking Alert!
                </strong>
              </div>
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                1.2 km away
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <strong className="text-slate-900 font-bold">{incomingJobAlert.serviceName}</strong>
                <span className="text-sm font-black text-slate-900 font-mono">
                  ₹{incomingJobAlert.baseAmount}
                </span>
              </div>
              <p className="text-slate-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{incomingJobAlert.area}</span>
              </p>
              <p className="text-slate-500 text-[11px]">
                Citizen: {incomingJobAlert.customerName}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => declineJob(incomingJobAlert.id)}
                className="py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                Pass
              </button>
              <button
                onClick={() => handleAccept(incomingJobAlert.id)}
                className="py-2.5 rounded-xl font-bold text-xs btn-glossy-green text-white shadow-md transition-all active:scale-95 flex items-center justify-center gap-1"
              >
                <Check className="w-4 h-4" />
                <span>Accept Job</span>
              </button>
            </div>
          </div>
        )}

        {/* ACTIVE JOB EXECUTION CARD */}
        {activeJob && (
          <div className="glass-panel p-5 rounded-3xl border-2 border-emerald-400 bg-white/95 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block">
                  Active Service In Progress
                </span>
                <strong className="text-sm font-bold text-slate-900">
                  {activeJob.serviceName}
                </strong>
              </div>
              <span className="text-base font-black text-slate-900 font-mono">
                ₹{activeJob.baseAmount}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Customer:</span>
                <strong className="text-slate-900">{activeJob.customerName}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Location:</span>
                <span className="text-slate-900 font-medium">{activeJob.area}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Phone:</span>
                <a href={`tel:${activeJob.customerPhone}`} className="text-blue-600 font-mono font-bold hover:underline">
                  {activeJob.customerPhone}
                </a>
              </div>
            </div>

            {/* Step 1: OTP Verification */}
            {activeJob.status === "in_transit" && (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-700 block">
                  Ask customer for 4-digit start OTP:
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={4}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    placeholder="Enter 4-digit OTP"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 text-center font-mono font-bold tracking-widest text-sm focus:outline-none focus:border-emerald-600 shadow-inner"
                  />
                  <button
                    onClick={() => handleVerifyOtp(activeJob.id)}
                    className="px-4 py-2 rounded-xl font-bold text-xs btn-glossy-blue text-white shrink-0 shadow-md"
                  >
                    Verify
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Complete Service */}
            {activeJob.status === "otp_verified" && (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>OTP Verified! Work is in progress.</span>
                </div>
                <button
                  onClick={() => handleComplete(activeJob.id)}
                  className="w-full py-3 rounded-xl font-bold text-xs btn-glossy-green text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Mark Work Completed & Collect ₹{activeJob.baseAmount}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* COOPERATIVE TOOL LIBRARY CARD */}
        <div className="glass-panel p-5 rounded-3xl border border-white shadow-glass space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span>🛠️ Primary Co-op Tool Library</span>
            </h3>
            <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full font-semibold">
              Free Access
            </span>
          </div>

          <p className="text-slate-600 leading-relaxed">
            Borrow heavy power tools (rotary drills, drain snakes, multimeter testers) from your local Labour Felicitation Centre (LFC) with zero security deposit.
          </p>
        </div>
      </div>
    </div>
  );
};
