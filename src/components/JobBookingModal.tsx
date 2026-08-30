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
    currentUser,
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [customerName, setCustomerName] = useState(currentUser?.name || "Vikas Deshpande");
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || "+91 98220 11902");
  const [address, setAddress] = useState(currentUser?.address || "Flat 304, Green Meadows, Dadar, Mumbai");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in font-sans">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl p-1.5 bg-blue-50 rounded-xl border border-blue-200">
              {service.icon}
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                {language === "hi" ? service.nameHi : language === "mr" ? service.nameMr : service.name}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Regulated Base: ₹{service.baseWage} / {service.unit}
              </p>
            </div>
          </div>

          <button
            onClick={closeBookingModal}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          
          {/* STEP 1: Details & Slot */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="relative h-32 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent" />
                <div className="absolute bottom-2.5 left-3 text-white">
                  <span className="text-[10px] font-mono uppercase bg-blue-600 px-2 py-0.5 rounded font-bold">
                    {service.category}
                  </span>
                  <p className="text-xs font-semibold mt-0.5 drop-shadow">{service.description}</p>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Contact Mobile (For Direct OTP)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600 font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Service Delivery Address ({selectedCity})</label>
                <div className="relative">
                  <Home className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                    required
                  />
                </div>
              </div>

              <button
                onClick={handleProceedToPayment}
                className="w-full py-3 rounded-xl font-bold btn-glossy-blue text-white shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <span>View Transparent Split & Proceed</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Transparent 92/6/2 Invoice */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
                <span className="text-[10px] uppercase font-bold text-blue-900 tracking-wider block">
                  Statutory Fair Wage Invoice
                </span>
                <div className="flex items-center justify-between text-base font-extrabold text-slate-900">
                  <span>Total Amount Payable:</span>
                  <span className="font-mono text-xl text-blue-600">₹{basePrice}</span>
                </div>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between">
                  <div>
                    <strong>₹{workerPayout} (92%)</strong>
                    <span className="block text-[10px] text-emerald-700 font-sans">
                      Direct Worker UPI Take-Home (Zero cut)
                    </span>
                  </div>
                  <span className="text-lg">🛠️</span>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 flex items-center justify-between">
                  <div>
                    <strong>₹{welfareLocker} (6%)</strong>
                    <span className="block text-[10px] text-blue-700 font-sans">
                      e-Shram PMSBY Accident + Retirement Pension
                    </span>
                  </div>
                  <span className="text-lg">🛡️</span>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 flex items-center justify-between">
                  <div>
                    <strong>₹{adminFund} (2%)</strong>
                    <span className="block text-[10px] text-amber-700 font-sans">
                      Co-op Labour Felicitation Tool Library Maintenance
                    </span>
                  </div>
                  <span className="text-lg">🏢</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="py-2.5 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="py-2.5 rounded-xl font-bold btn-glossy-green text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Dispatch Artisan</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Confirmed with OTP */}
          {step === 3 && (
            <div className="space-y-5 text-center py-2 animate-in zoom-in-95">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl shadow-sm border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-extrabold text-slate-900">Artisan Dispatched!</h4>
                <p className="text-xs text-slate-600">
                  Your request has been routed to verified cooperatives in {selectedCity}.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Provide this OTP to artisan upon arrival:
                </span>
                <div className="text-3xl font-black font-mono tracking-widest text-blue-600">
                  {generatedOtp}
                </div>
                <span className="text-[10px] text-slate-500 block font-mono">
                  Booking ID: #{confirmedBookingId}
                </span>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3 rounded-xl font-bold btn-glossy-blue text-white shadow-md active:scale-95 transition-all"
              >
                Close & Track in Account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
