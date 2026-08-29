"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Clock,
  Sparkles,
  Phone,
  User,
  Home,
  FileText,
  BadgeIndianRupee,
  Share2,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export const JobBookingModal: React.FC = () => {
  const {
    activeBookingModalService,
    closeBookingModal,
    createBooking,
    language,
    selectedCity,
    setActiveTab,
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [customerName, setCustomerName] = useState("Vikas Deshpande");
  const [customerPhone, setCustomerPhone] = useState("+91 98220 11902");
  const [address, setAddress] = useState("Flat 304, Green Meadows, Dharampeth, Nagpur");
  const [timeSlot, setTimeSlot] = useState("Immediate (Next 30 Mins)");
  const [notes, setNotes] = useState("");
  const [confirmedBookingId, setConfirmedBookingId] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  if (!activeBookingModalService) return null;

  const service = activeBookingModalService;
  const basePrice = service.baseWage;
  const workerPayout = Number((basePrice * 0.92).toFixed(1));
  const welfareLocker = Number((basePrice * 0.06).toFixed(1));
  const adminFund = Number((basePrice * 0.02).toFixed(1));

  const handleProceedToPayment = () => {
    setStep(2);
  };

  const handleConfirmBooking = async () => {
    const newBooking = await createBooking(service, {
      name: customerName,
      phone: customerPhone,
      address,
      notes: notes || `Request for ${service.name} (${timeSlot})`,
    });
    setConfirmedBookingId(newBooking.id);
    setGeneratedOtp(newBooking.otpCode);
    setStep(3);
  };

  const handleFinish = () => {
    closeBookingModal();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl bg-[#121314] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161719]">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              {service.icon}
            </span>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {language === "hi" ? service.nameHi : language === "mr" ? service.nameMr : service.name}
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                {service.govWageStandard} • {selectedCity}
              </p>
            </div>
          </div>
          <button
            onClick={closeBookingModal}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-emerald-300">
                    State-Verified Cooperative Protection
                  </h4>
                  <p className="text-[11px] text-zinc-300 mt-0.5 leading-relaxed">
                    Every artisan assigned is vetted through Aadhaar e-KYC and the National Cooperative Database (NCD). 92% of your payment is settled directly to their bank account.
                  </p>
                </div>
              </div>

              {/* Form inputs */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#161719] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                      placeholder="e.g. Anand Kulkarni"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Phone Number (For OTP Verification)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-[#161719] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                        placeholder="+91 98230 XXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Preferred Arrival Time
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full bg-[#161719] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option>Immediate (Next 30 Mins)</option>
                        <option>Today Evening (5:00 PM - 7:00 PM)</option>
                        <option>Tomorrow Morning (9:00 AM - 12:00 PM)</option>
                        <option>Weekend Dedicated Slot</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Service Address / Landmark
                  </label>
                  <div className="relative">
                    <Home className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#161719] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                      placeholder="House/Apartment number, street, area"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Specific Fault / Requirement Details (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#161719] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. Main switchboard tripping whenever water pump turns on..."
                  />
                </div>
              </div>

              {/* Price preview */}
              <div className="p-3 bg-[#161719] rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400">Pre-Fixed Cooperative Base Wage:</span>
                  <p className="text-[10px] text-zinc-500">Zero surge pricing • No corporate markups</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-emerald-400 font-mono">
                    {formatINR(basePrice)}
                  </span>
                  <span className="text-[10px] text-zinc-400 block">{service.unit}</span>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center pb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <BadgeIndianRupee className="w-3.5 h-3.5" />
                  Direct UPI Split Settlement Engine
                </span>
                <h4 className="text-sm font-bold text-white mt-2">
                  Transparent Payout Breakdown for ₹{basePrice}
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Compliant with India's Code on Social Security (2020)
                </p>
              </div>

              {/* Breakdown cards */}
              <div className="space-y-2.5">
                {/* 92% Worker */}
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center font-bold text-emerald-400 text-sm">
                      92%
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">
                        Direct to Artisan's Bank Account (UPI)
                      </h5>
                      <p className="text-[10px] text-zinc-400">
                        Zero middlemen commission • Instant credit upon completion
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold font-mono text-emerald-400">
                    {formatINR(workerPayout)}
                  </span>
                </div>

                {/* 6% Welfare */}
                <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center font-bold text-blue-400 text-sm">
                      6%
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">
                        e-Shram Social Security & Pension Fund
                      </h5>
                      <p className="text-[10px] text-zinc-400">
                        Accident insurance + Ayushman health + retirement fund
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold font-mono text-blue-400">
                    {formatINR(welfareLocker)}
                  </span>
                </div>

                {/* 2% Admin */}
                <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center font-bold text-purple-400 text-sm">
                      2%
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">
                        Local Cooperative Hub Maintenance
                      </h5>
                      <p className="text-[10px] text-zinc-400">
                        Labour Felicitation Centre (LFC) server & tool library
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold font-mono text-purple-400">
                    {formatINR(adminFund)}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#161719] border border-white/5 flex items-center justify-between text-xs">
                <span className="text-zinc-300">Total Payable via UPI / Card:</span>
                <span className="text-base font-bold text-white font-mono">
                  {formatINR(basePrice)}
                </span>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 text-center py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>

              <div>
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                  Booking Reference: {confirmedBookingId}
                </span>
                <h4 className="text-lg font-bold text-white mt-1">
                  Artisan Dispatched via Bhuvan Radar!
                </h4>
                <p className="text-xs text-zinc-400 max-w-md mx-auto mt-1">
                  Your request has been routed to the Nagpur Central District Labour Federation.
                </p>
              </div>

              {/* OTP Box */}
              <div className="p-4 bg-gradient-to-br from-emerald-950/40 to-teal-950/40 border border-emerald-500/40 rounded-2xl max-w-xs mx-auto">
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-mono">
                  Doorstep Safety OTP
                </span>
                <div className="text-3xl font-black tracking-widest text-emerald-300 font-mono my-1">
                  {generatedOtp}
                </div>
                <p className="text-[10px] text-zinc-400">
                  Share this 4-digit code with the artisan when they arrive at your location.
                </p>
              </div>

              <div className="p-3 bg-[#161719] rounded-xl text-left border border-white/5 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Assigned Society:</span>
                  <span className="text-white font-medium">Nagpur Central Labour Co-op (NLCF)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Service:</span>
                  <span className="text-white font-medium">{service.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Address:</span>
                  <span className="text-white font-medium truncate max-w-[200px]">{address}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#161719] flex items-center justify-between">
          {step === 1 && (
            <>
              <button
                onClick={closeBookingModal}
                className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleProceedToPayment}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-black hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <span>Review Transparent Payout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleConfirmBooking}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-black hover:from-emerald-400 hover:to-teal-300 transition-all shadow-lg shadow-emerald-500/25"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Confirm & Dispatch Artisan (₹{basePrice})</span>
              </button>
            </>
          )}

          {step === 3 && (
            <div className="w-full flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  closeBookingModal();
                  setActiveTab("worker");
                }}
                className="flex-1 px-4 py-2 rounded-xl text-xs font-semibold bg-[#121314] border border-white/10 text-zinc-200 hover:text-white hover:border-emerald-500/40 transition-colors"
              >
                View in Worker Mobile App 📱
              </button>
              <button
                onClick={handleFinish}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-black hover:bg-emerald-400 transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
