"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  User,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Building,
  CreditCard,
  History,
  CheckCircle2,
  Lock,
  Edit2,
  Save,
  Globe,
  Bell,
  LogOut,
  Smartphone,
  BadgeIndianRupee,
  Layers,
  Sparkles,
  Award,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export const AccountView: React.FC = () => {
  const {
    currentUser,
    updateUserProfile,
    loginUser,
    logoutUser,
    bookings,
    currentWorker,
    language,
    setLanguage,
    selectedCity,
    setActiveTab,
    setIsPricingModalOpen,
    t,
  } = useApp();


  const isWorker = currentUser?.role === "artisan";

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || (isWorker ? "Vidya Deshmukh" : "Vikas Deshpande"),
    phone: currentUser?.phone || (isWorker ? "+91 98221 55012" : "+91 98220 11902"),
    email: currentUser?.email || (isWorker ? "vidya.crafts@nlcf.org" : "vikas.deshpande@gmail.com"),
    city: currentUser?.city || selectedCity.split(",")[0],
    address: currentUser?.address || (isWorker ? "Dadar East, Mumbai" : "Dadar West, Mumbai"),
    upiId: currentUser?.upiId || (isWorker ? "vidya.shg@upi" : "vikas@upi"),
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(formData);
    setIsEditing(false);
  };

  // Filter bookings for this user/worker
  const relevantBookings = isWorker
    ? bookings.filter((b) => b.assignedWorker?.id === currentWorker.id || b.status === "completed")
    : bookings.filter((b) => b.customerPhone === currentUser?.phone || b.customerName === currentUser?.name);

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#F0F6FF] via-[#F8FAFC] to-[#EFF6FF] text-slate-900 pb-24 pt-6 sm:pt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
        
        {/* Top Header Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border border-white shadow-glass">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-2xl sm:text-3xl font-extrabold shadow-md border-2 border-white">
                {isWorker ? "🛠️" : "👤"}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {currentUser?.name || formData.name}
                </h1>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  isWorker
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    : "bg-blue-100 text-blue-800 border border-blue-200"
                }`}>
                  {isWorker ? "Verified Artisan" : "Verified Citizen"}
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>{formData.city} • Aadhaar e-KYC Certified</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 shadow-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5 text-blue-600" />
              <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
            </button>

            <button
              onClick={() => loginUser(isWorker ? "citizen" : "artisan")}
              className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                isWorker
                  ? "btn-glossy-blue"
                  : "btn-glossy-green"
              }`}
            >
              <span>Switch to {isWorker ? "Citizen" : "Artisan"}</span>
            </button>
          </div>
        </div>

        {/* DASHBOARD PROGRESS INDICATORS & QUICK ACCESS ACTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Metric 1: Monthly Jobs Target */}
          <div className="glass-panel p-5 rounded-3xl border border-white shadow-card-soft space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>{isWorker ? "Jobs Completed This Month" : "Total Bookings Made"}</span>
              <span className="text-blue-600 font-mono font-black">{isWorker ? "18 / 20" : "6 Orders"}</span>
            </div>
            <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full w-[90%]" />
            </div>
            <span className="text-[10px] text-slate-500 block font-medium">
              {isWorker ? "90% of Monthly Guild Milestone Reached 🎯" : "Active verified consumer profile"}
            </span>
          </div>

          {/* Metric 2: Monthly Cumulative Earnings */}
          <div className="glass-panel p-5 rounded-3xl border border-white shadow-card-soft space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>{isWorker ? "Earnings This Month" : "Total Direct Savings"}</span>
              <span className="text-emerald-700 font-mono font-black">{isWorker ? "₹34,800" : "₹4,250 Saved"}</span>
            </div>
            <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2.5 rounded-full w-[85%]" />
            </div>
            <span className="text-[10px] text-slate-500 block font-medium">
              {isWorker ? "100% Direct UPI Settlement • 0% Cut" : "Zero corporate middleman commission"}
            </span>
          </div>

          {/* Metric 3: e-Shram Pension Balance */}
          <div className="glass-panel p-5 rounded-3xl border border-white shadow-card-soft space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>e-Shram Social Security</span>
              <span className="text-[#E67E22] font-mono font-black">₹2,270 Total</span>
            </div>
            <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 h-2.5 rounded-full w-[100%]" />
            </div>
            <span className="text-[10px] text-slate-500 block font-medium">
              Statutory 6% PMSBY accident + retirement trust
            </span>
          </div>
        </div>


        {/* 2-Column Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Column: Personal Information & Verified Rails */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Personal Details Form / View */}
            <div className="glass-panel p-6 rounded-3xl border border-white shadow-glass space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Personal & Contact Information</span>
                </h2>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                  100% Encrypted
                </span>
              </div>

              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Mobile Number</label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">City / Region</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">UPI ID for Direct Transfers</label>
                      <input
                        type="text"
                        value={formData.upiId}
                        onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Service / Residential Address</label>
                    <textarea
                      rows={2}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl btn-glossy-blue font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Profile Changes</span>
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-1">
                    <span className="text-slate-400 text-[10px] block uppercase font-bold">Phone Number</span>
                    <strong className="text-slate-800 block font-mono">{formData.phone}</strong>
                  </div>

                  <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-1">
                    <span className="text-slate-400 text-[10px] block uppercase font-bold">Email Address</span>
                    <strong className="text-slate-800 block truncate">{formData.email}</strong>
                  </div>

                  <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-1">
                    <span className="text-slate-400 text-[10px] block uppercase font-bold">Active City</span>
                    <strong className="text-slate-800 block">{formData.city}</strong>
                  </div>

                  <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-1">
                    <span className="text-slate-400 text-[10px] block uppercase font-bold">Settlement UPI ID</span>
                    <strong className="text-blue-600 block font-mono font-semibold">{formData.upiId}</strong>
                  </div>

                  <div className="sm:col-span-2 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-1">
                    <span className="text-slate-400 text-[10px] block uppercase font-bold">Address / Location</span>
                    <p className="text-slate-800 font-medium">{formData.address}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Sovereign Identity & Welfare Credentials */}
            <div className="glass-panel p-6 rounded-3xl border border-white shadow-glass space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Sovereign Identity & Statutory Records</span>
                </h2>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                  Govt. of India Aligned
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
                  <Award className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-950 block text-xs">Aadhaar e-KYC Verified</strong>
                    <span className="text-[11px] text-emerald-700">Digital signature background passed.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-start gap-3">
                  <Building className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-blue-950 block text-xs">
                      {isWorker ? "NLCF Cooperative Guild" : "Citizen Consumer Node"}
                    </strong>
                    <span className="text-[11px] text-blue-700">
                      {isWorker ? "Maa Sharda Mahila Cooperative" : "ONDC Open Network Verified"}
                    </span>
                  </div>
                </div>

                {isWorker && (
                  <div className="sm:col-span-2 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                    <BadgeIndianRupee className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-950 block text-xs">
                        e-Shram Social Security UAN: {currentUser?.uan || "UAN-8890-5012-9901"}
                      </strong>
                      <span className="text-[11px] text-amber-800">
                        Code on Social Security 2020: 6% automatic PMSBY accident & retirement lock.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order & Booking History */}
            <div className="glass-panel p-6 rounded-3xl border border-white shadow-glass space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <History className="w-4 h-4 text-blue-600" />
                  <span>{isWorker ? "Recent Gig Ledger" : "Your Bookings & Invoices"}</span>
                </h2>
                <span className="text-xs text-slate-500 font-semibold">{relevantBookings.length} Records</span>
              </div>

              <div className="space-y-3">
                {relevantBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-slate-900 font-bold">{b.serviceName}</strong>
                        <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                          {b.id}
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px]">
                        {b.area} • OTP: <span className="font-mono font-bold text-blue-600">{b.otpCode}</span>
                      </p>
                    </div>

                    <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                      <span className="text-sm font-black text-slate-900 font-mono">
                        ₹{b.baseAmount}
                      </span>
                      <span className={`text-[10px] font-bold capitalize px-2 py-0.5 rounded-full ${
                        b.status === "completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {b.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Financial Highlights & Preferences */}
          <div className="space-y-6">
            
            {/* Payout / Split Card */}
            <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white shadow-glass space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span>{isWorker ? "Earnings & Pension Locker" : "Transparent 92% Payout"}</span>
              </h3>

              {isWorker ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md space-y-1">
                    <span className="text-[10px] uppercase font-bold opacity-80 block tracking-wider">
                      Today's UPI Direct Take-Home
                    </span>
                    <div className="text-2xl sm:text-3xl font-black font-mono">
                      ₹{currentWorker.todayEarnings}
                    </div>
                    <span className="text-[10px] text-emerald-100 block">
                      Settled instantly to {formData.upiId}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs space-y-1">
                    <div className="flex items-center justify-between text-blue-900 font-bold">
                      <span>e-Shram Pension Trust:</span>
                      <span className="font-mono text-emerald-700">+₹{currentWorker.todayWelfareSaved}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Accumulating in your national social security wallet with zero corporate middleman cuts.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-900 text-white shadow-md space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Every ₹1,000 You Spend
                    </span>
                    <div className="space-y-1 font-mono text-xs">
                      <div className="flex items-center justify-between text-emerald-400 font-bold">
                        <span>₹920 (92%)</span>
                        <span className="text-[11px] font-normal text-white">Direct Artisan UPI</span>
                      </div>
                      <div className="flex items-center justify-between text-blue-300 font-semibold">
                        <span>₹60 (6%)</span>
                        <span className="text-[11px] font-normal text-white">e-Shram Insurance</span>
                      </div>
                      <div className="flex items-center justify-between text-amber-300 font-semibold">
                        <span>₹20 (2%)</span>
                        <span className="text-[11px] font-normal text-white">Co-op Tool Fund</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Unlike private apps charging 30% commissions, KaryaSetu ensures 100% fair wage baselines.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Actions Panel */}
            <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white shadow-glass space-y-3 text-xs">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E67E22]" />
                <span>Quick Access Shortcuts</span>
              </h3>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    loginUser("citizen");
                    setActiveTab("customer");
                  }}
                  className="w-full py-2.5 px-3 rounded-xl font-bold btn-glossy-blue text-white shadow-xs flex items-center justify-between text-xs transition-all active:scale-95"
                >
                  <span>🛍️ Explore & Book Services</span>
                  <span>→</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab("map");
                  }}
                  className="w-full py-2.5 px-3 rounded-xl font-bold bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 shadow-xs flex items-center justify-between text-xs transition-all"
                >
                  <span>📍 India Presence Map</span>
                  <span>→</span>
                </button>

                <button
                  onClick={() => setIsPricingModalOpen(true)}
                  className="w-full py-2.5 px-3 rounded-xl font-bold bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 shadow-xs flex items-center justify-between text-xs transition-all"
                >
                  <span>⚖️ Fair Wage Economics Matrix</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Language & Settings */}
            <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white shadow-glass space-y-4 text-xs">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>Language & Preferences</span>
              </h3>


              <div className="space-y-2">
                <label className="block text-slate-600 font-semibold">Preferred Interface Language</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { code: "en", label: "English" },
                    { code: "hi", label: "हिंदी" },
                    { code: "mr", label: "मराठी" },
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLanguage(l.code as any)}
                      className={`py-2 rounded-xl font-bold transition-colors ${
                        language === l.code
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <button
                  onClick={logoutUser}
                  className="w-full py-2.5 rounded-xl font-bold bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out of Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
