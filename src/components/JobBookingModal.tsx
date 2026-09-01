"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  X,
  Sparkles,
  ShieldCheck,
  Zap,
  MapPin,
  Clock,
  ArrowRight,
  Phone,
  User,
  CheckCircle2,
  FileText,
  CreditCard,
  Building2,
  QrCode,
} from "lucide-react";
import { formatINR } from "@/lib/utils";
import { processRazorpayPayment, PaymentInvoice } from "@/lib/razorpay";
import { sendFCMNotification } from "@/lib/notifications";
import confetti from "canvas-confetti";

export const JobBookingModal: React.FC = () => {
  const {
    activeBookingModalService,
    closeBookingModal,
    createBooking,
    selectedCity,
    setActiveTab,
    setActiveTrackingBooking,
    setCurrentInvoice,
    setIsInvoiceOpen,
    addToast,
  } = useApp();

  const [step, setStep] = useState<1 | 2>(1);
  const [customerName, setCustomerName] = useState("Vikas Deshpande");
  const [customerPhone, setCustomerPhone] = useState("+91 98220 11902");
  const [address, setAddress] = useState("Flat 402, Civil Lines, Nagpur");
  const [notes, setNotes] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  if (!activeBookingModalService) return null;

  const base = activeBookingModalService.baseWage;
  const workerPayout = Number((base * 0.92).toFixed(1));
  const welfareLocker = Number((base * 0.06).toFixed(1));
  const adminFund = Number((base * 0.02).toFixed(1));

  const handleRazorpayPaymentAndBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    try {
      // 1. Process Razorpay Payment & Tax Invoice
      const paymentResult = await processRazorpayPayment({
        amount: base,
        currency: "INR",
        orderId: "order_ks_" + Date.now(),
        customerName,
        customerPhone,
        customerEmail: "customer@karyasetu.in",
        serviceName: activeBookingModalService.name,
        workerName: "Ramesh Kumar (Certified Wireman)",
        workerPayout,
        welfareLocker,
        adminFund,
      });

      // 2. Create Booking in SQLite DB & Context
      const newBooking = await createBooking(activeBookingModalService, {
        name: customerName,
        phone: customerPhone,
        address,
        notes,
      });

      // 3. Trigger Firebase Cloud Messaging (FCM) Notification
      sendFCMNotification(
        "Payment Settled & Artisan Dispatched! 🚀",
        `Booking ${newBooking.id} confirmed. 92% (₹${workerPayout}) routed to artisan bank account.`,
        "payment"
      );

      // 4. Set Active Tracking and Invoice
      setCurrentInvoice(paymentResult.invoice);
      setActiveTrackingBooking({
        ...newBooking,
        status: "in_transit",
        assignedWorker: {
          id: "w1",
          workerId: "#4012",
          name: "Ramesh Kumar",
          nameHi: "रमेश कुमार",
          nameMr: "रमेश कुमार",
          photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
          phone: "+91 98231 44012",
          trade: "Certified Electrician",
          tradeHi: "प्रमाणित इलेक्ट्रीशियन",
          tradeMr: "प्रमाणित इलेक्ट्रिशियन",
          rating: 4.9,
          totalJobs: 142,
          state: "Maharashtra",
          city: "Nagpur",
          societyName: "Nagpur Central Labour Co-op (NLCF-78)",
          societyTier: "Primary Society",
          verifiedAadhaar: true,
          verifiedNCD: true,
          eShramCardNo: "UAN-8890-4412-9901",
          status: "busy",
          currentLocation: { lat: 21.1458, lng: 79.0882, area: "Dighori, Nagpur" },
          todayEarnings: 1240,
          todayWelfareSaved: 84,
          upiId: "ramesh.nlcf@upi",
          skills: ["Wiring", "Fan Installation", "MCB Repair"],
          languages: ["Hindi", "Marathi", "English"],
          hasSmartphone: true,
        },
      });

      // 5. Confetti effect
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {}

      setIsProcessingPayment(false);
      closeBookingModal();

      // 6. REDIRECT CONSUMER TO LIVE MAP INTERFACE
      setActiveTab("map");

      addToast(
        "Redirecting to Live GPS Map! 🗺️",
        `Tracking artisan to your destination (${address}). Tax invoice ready.`,
        "success"
      );
    } catch (error) {
      setIsProcessingPayment(false);
      addToast("Payment Failed", "Please retry Razorpay checkout.", "alert");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-lg shadow-2xs">
              {activeBookingModalService.icon}
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Book Verified Cooperative Artisan
              </h3>
              <p className="text-[10px] text-slate-500 font-mono font-medium">
                {activeBookingModalService.name} • {selectedCity}
              </p>
            </div>
          </div>
          <button
            onClick={closeBookingModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleRazorpayPaymentAndBooking} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {/* 1. Transparent 92/6/2 Payout Ledger Preview */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-800 uppercase tracking-wider font-extrabold">
                Transparent Payout Rail (Code on Social Security 2020)
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                0% SURGE PRICING
              </span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between text-slate-700 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  92.0% Direct Worker Take-Home (UPI):
                </span>
                <strong className="text-emerald-700 font-mono font-bold">{formatINR(workerPayout)}</strong>
              </div>

              <div className="flex justify-between text-slate-700 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  6.0% e-Shram Pension & Accident Fund:
                </span>
                <span className="text-blue-700 font-mono font-bold">{formatINR(welfareLocker)}</span>
              </div>

              <div className="flex justify-between text-slate-700 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  2.0% Local Cooperative Hub Maintenance:
                </span>
                <span className="text-amber-700 font-mono font-bold">{formatINR(adminFund)}</span>
              </div>

              <div className="pt-2 border-t border-emerald-200 flex justify-between text-xs font-bold text-slate-900">
                <span>Total Fixed Wage (No Surge / No Middleman):</span>
                <span className="text-emerald-700 font-mono text-sm font-black">{formatINR(base)}</span>
              </div>
            </div>
          </div>

          {/* 2. Customer Contact & Delivery Info */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
              Customer Details & Service Destination
            </h4>

            <div>
              <label className="block text-slate-700 font-bold mb-1 text-[11px]">
                Your Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Vikas Deshpande"
                  className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1 text-[11px]">
                Contact Mobile Number (for 4-Digit Job OTP)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+91 98220 11902"
                  className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 text-xs font-mono font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1 text-[11px]">
                Service Address / Destination Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat No, Building, Street, Area"
                  className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1 text-[11px]">
                Specific Fault / Job Instructions (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Ceiling fan humming sound, switch board burning smell..."
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-medium"
              />
            </div>
          </div>

          {/* 3. Razorpay Payment Gateway & Checkout Button */}
          <div className="pt-2 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-600">
              <span className="flex items-center gap-1 font-medium">
                <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                Razorpay Sovereign UPI & Card Gateway
              </span>
              <span className="font-mono text-emerald-700 font-bold">Instant GST Invoice</span>
            </div>

            <button
              type="submit"
              disabled={isProcessingPayment}
              className="w-full py-3.5 rounded-2xl font-extrabold btn-glossy-blue text-white shadow-md flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 text-xs"
            >
              <span>
                {isProcessingPayment
                  ? "Processing Razorpay UPI Payment..."
                  : `Pay ${formatINR(base)} via Razorpay & Track Live`}
              </span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

