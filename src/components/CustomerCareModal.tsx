"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  X,
  PhoneCall,
  MessageSquare,
  HelpCircle,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Send,
  LifeBuoy,
} from "lucide-react";

interface CustomerCareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerCareModal: React.FC<CustomerCareModalProps> = ({ isOpen, onClose }) => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState<"helpline" | "ticket" | "faq">("helpline");
  const [ticketSubject, setTicketSubject] = useState("Service Delay / In-Transit Inquiry");
  const [ticketDetails, setTicketDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = "TKT-KS-" + Math.floor(1000 + Math.random() * 9000);
      addToast(
        "Grievance Ticket Registered! 📋",
        `Reference #${ticketId} dispatched to Nagpur Central Labour Cooperative Federation.`,
        "success"
      );
      setTicketDetails("");
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 shadow-2xs">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Cooperative Citizen & Worker Helpdesk
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                24/7 Grievance Redressal • National Labour Cooperatives Federation (NLCF)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 gap-1 p-2 bg-slate-100/80 border-b border-slate-200 text-xs">
          {[
            { id: "helpline", label: "📞 Live Helplines" },
            { id: "ticket", label: "📋 Raise Ticket" },
            { id: "faq", label: "❓ FAQs" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 rounded-xl font-bold transition-all text-xs ${
                activeTab === tab.id
                  ? "bg-white text-blue-700 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {activeTab === "helpline" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-3">
                <span className="text-[10px] font-mono text-blue-900 uppercase tracking-wider block font-extrabold">
                  TOLL-FREE SOVEREIGN HELPLINE
                </span>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-black text-slate-900">1800-KARYA-SETU</h4>
                    <p className="text-[11px] text-slate-600 font-medium">1800 527 9273 (Toll Free, 24x7)</p>
                  </div>
                  <a
                    href="tel:18005279273"
                    className="px-3.5 py-2 rounded-xl btn-glossy-blue text-white font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    WhatsApp Official Bot
                  </h5>
                  <p className="text-[11px] text-slate-600">+91 98220 11902 (Instant Status)</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    Nagpur District LFC Desk
                  </h5>
                  <p className="text-[11px] text-slate-600">Civil Lines, Nagpur (Office Hours)</p>
                </div>
              </div>

              {/* SOS Worker Safety Banner */}
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-rose-900 block text-xs">
                    🚨 SOS Emergency Safety Hotline
                  </span>
                  <p className="text-[10px] text-slate-600">
                    Immediate police & emergency dispatch for artisans on-duty.
                  </p>
                </div>
                <a
                  href="tel:112"
                  className="px-3 py-1.5 bg-rose-600 text-white font-bold rounded-xl text-xs hover:bg-rose-700 transition-colors shadow-xs active:scale-95"
                >
                  Dial 112
                </a>
              </div>
            </div>
          )}

          {activeTab === "ticket" && (
            <form onSubmit={handleTicketSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1 text-[11px]">
                  Category / Subject
                </label>
                <select
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                >
                  <option>Service Delay / In-Transit Inquiry</option>
                  <option>Payment & Razorpay Settlement Issue</option>
                  <option>Workmanship Quality Grievance</option>
                  <option>Offline Artisan Registration Request</option>
                  <option>e-Shram Universal Account Number (UAN) Linking</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1 text-[11px]">
                  Detailed Description
                </label>
                <textarea
                  rows={4}
                  required
                  value={ticketDetails}
                  onChange={(e) => setTicketDetails(e.target.value)}
                  placeholder="Explain your query or issue with booking ID / details..."
                  className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl font-bold btn-glossy-blue text-white shadow-md flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50 text-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "Submitting..." : "Submit Grievance Ticket"}</span>
              </button>
            </form>
          )}

          {activeTab === "faq" && (
            <div className="space-y-2.5">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <h5 className="font-bold text-slate-900 text-xs">How do 92% direct payouts work?</h5>
                <p className="text-slate-600 text-[11px] leading-relaxed font-medium">
                  When a customer settles a service fee via UPI, 92% is instantly routed to the worker's bank account without corporate middleman delays.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <h5 className="font-bold text-slate-900 text-xs">What is the 6% e-Shram allocation?</h5>
                <p className="text-slate-600 text-[11px] leading-relaxed font-medium">
                  In compliance with the Code on Social Security 2020, 6% is locked in the worker's government-backed accident insurance and pension locker.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <h5 className="font-bold text-slate-900 text-xs">Are rates fixed or subject to surge pricing?</h5>
                <p className="text-slate-600 text-[11px] leading-relaxed font-medium">
                  KaryaSetu has zero surge pricing. All service rates are benchmarked directly to State Labour Minimum Wage Board standards.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-3 border-t border-slate-200 bg-slate-50/80 flex justify-between items-center text-[10px] text-slate-500 font-medium">
          <span>KaryaSetu Redressal Officer: Adv. S. Deshmukh</span>
          <button onClick={onClose} className="hover:text-slate-900 font-bold">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

