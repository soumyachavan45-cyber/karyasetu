"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { KaryaSetuLogo } from "@/components/KaryaSetuLogo";
import {
  User,
  Smartphone,
  Lock,
  ArrowRight,
  ShieldCheck,
  Phone,
  KeyRound,
  Sparkles,
  Mic,
  ArrowLeft,
  CheckCircle2,
  Mail,
  MapPin,
  Briefcase,
  Globe,
  FileText,
} from "lucide-react";

export type AuthRole = "worker" | "consumer";

export const LoginPage: React.FC<{
  onSuccess: (role: "citizen" | "artisan", userData?: any) => void;
  onBackToLanding: () => void;
}> = ({ onSuccess, onBackToLanding }) => {
  const { addToast, speakText, language } = useApp();

  const [authRole, setAuthRole] = useState<AuthRole>("consumer");
  const [isNewUser, setIsNewUser] = useState(false);

  // Common & Role-Specific Form Fields
  const [fullName, setFullName] = useState("Vikas Deshpande");
  const [email, setEmail] = useState("vikas.deshpande@gmail.com");
  const [phone, setPhone] = useState("+91 98220 11902");
  const [profession, setProfession] = useState("Certified Master Electrician");
  const [workLocation, setWorkLocation] = useState("Sitabuldi & Dharampeth, Nagpur");
  const [preferredLang, setPreferredLang] = useState("English");
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // OTP State
  const [isOtpDispatched, setIsOtpDispatched] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("4921");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Handle Role Switch
  const handleRoleChange = (role: AuthRole) => {
    setAuthRole(role);
    setIsOtpDispatched(false);
    if (role === "worker") {
      setFullName("Ramesh Kumar");
      setEmail("ramesh.kumar.nlcf@gmail.com");
      setPhone("+91 98231 44012");
      setProfession("Certified Master Electrician");
      setWorkLocation("Dighori & Central Nagpur");
    } else if (role === "consumer") {
      setFullName("Vikas Deshpande");
      setEmail("vikas.deshpande@gmail.com");
      setPhone("+91 98220 11902");
      setWorkLocation("Civil Lines, Nagpur");
    }
  };

  const handleSendOtp = () => {
    if (!agreedToTerms) {
      addToast("Terms Agreement Required", "Please accept terms & conditions to proceed.", "warning");
      return;
    }
    setIsOtpDispatched(true);
    addToast(
      "OTP Dispatched via SMS 📲",
      `4-digit verification code '4921' sent to ${phone}.`,
      "info"
    );
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      addToast("Terms Required", "Please accept the cooperative terms and conditions.", "warning");
      return;
    }

    setIsAuthenticating(true);

    setTimeout(() => {
      setIsAuthenticating(false);
      const appRole = authRole === "worker" ? "artisan" : "citizen";

      addToast(
        "Authentication Successful! 🛡️",
        `Welcome ${fullName} to KaryaSetu (${authRole === "worker" ? "Artisan" : "Citizen"} Portal).`,
        "success"
      );

      onSuccess(appRole, {
        name: fullName,
        email,
        phone,
        profession: authRole === "worker" ? profession : undefined,
        location: workLocation,
        language: preferredLang,
      });
    }, 500);
  };

  // 1-Click Fast Demo Login
  const handleQuickDemoLogin = (role: AuthRole) => {
    const appRole = role === "worker" ? "artisan" : "citizen";
    addToast(
      "1-Click Demo Login Successful ⚡",
      `Authenticated as ${role === "worker" ? "Vidya / Ramesh (Artisan)" : "Vikas Deshpande (Citizen)"}`,
      "success"
    );
    onSuccess(appRole, {
      name: role === "worker" ? "Ramesh Kumar" : "Vikas Deshpande",
      email: role === "worker" ? "ramesh.kumar.nlcf@gmail.com" : "vikas.deshpande@gmail.com",
      phone: role === "worker" ? "+91 98231 44012" : "+91 98220 11902",
      profession: role === "worker" ? "Certified Master Electrician" : undefined,
      location: "Nagpur, Maharashtra",
    });
  };

  return (
    <div className="w-full min-h-screen bg-transparent text-slate-900 flex flex-col justify-between p-3 sm:p-6 relative">
      {/* Top Header */}
      <div className="relative z-10 max-w-4xl mx-auto w-full flex items-center justify-between py-2">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/90 text-slate-700 border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 text-blue-600" />
          <span>Back to Landing Page</span>
        </button>

        <KaryaSetuLogo size="sm" showTagline={false} />
      </div>

      {/* Main Authentication Card */}
      <div className="relative z-10 max-w-lg mx-auto w-full my-auto py-4 sm:py-6">
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/90 shadow-2xl space-y-5">
          {/* Header Title */}
          <div className="text-center space-y-1.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center mx-auto text-blue-700 shadow-xs">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {isNewUser ? "Create Your KaryaSetu Account" : "Welcome to KaryaSetu Portal"}
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Sovereign Authentication • 100% Aadhaar & e-Shram Verified
            </p>
          </div>

          {/* Role Selection Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => handleRoleChange("consumer")}
              className={`py-2.5 rounded-xl font-bold transition-all text-xs flex items-center justify-center gap-1.5 ${
                authRole === "consumer"
                  ? "bg-white text-blue-700 shadow-sm border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Citizen (Hire Services) 👤</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange("worker")}
              className={`py-2.5 rounded-xl font-bold transition-all text-xs flex items-center justify-center gap-1.5 ${
                authRole === "worker"
                  ? "bg-white text-emerald-700 shadow-sm border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Artisan (Earn Gigs) 🛠️</span>
            </button>
          </div>

          {/* 1-Click Demo Login Shortcuts */}
          <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center justify-between gap-2">
            <div>
              <strong className="text-xs text-blue-950 block">Instant 1-Click Demo Login</strong>
              <span className="text-[10px] text-blue-700">Skip SMS OTP & test directly</span>
            </div>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin(authRole)}
              className="px-3 py-1.5 rounded-xl btn-glossy-blue text-white text-xs font-bold shadow-xs active:scale-95 whitespace-nowrap"
            >
              Demo {authRole === "worker" ? "Artisan" : "Citizen"} ⚡
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-3.5 text-xs">
            {/* 1. Full Name */}
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-[11px]">
                Full Legal Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 text-xs font-medium"
                />
              </div>
            </div>

            {/* 2. Worker Profession / Trade (Worker Only) */}
            {authRole === "worker" && (
              <div>
                <label className="block text-slate-700 font-bold mb-1 text-[11px]">
                  Profession / Primary Trade
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <select
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-600 text-xs font-medium"
                  >
                    <option>Certified Master Electrician</option>
                    <option>Sanitary & Pipeline Plumber</option>
                    <option>HVAC & AC Repair Technician</option>
                    <option>Vedic Purohit / Puja Pandit</option>
                    <option>Solar Panel & EV Charger Installer</option>
                    <option>Master Carpenter & Woodcraft</option>
                    <option>SHG Handicrafts & Agro Supply</option>
                  </select>
                </div>
              </div>
            )}

            {/* 3. Location (Home / Workplace) */}
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-[11px]">
                {authRole === "worker" ? "Current Workplace / Service Area" : "Home Address / City"}
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={workLocation}
                  onChange={(e) => setWorkLocation(e.target.value)}
                  placeholder="e.g. Sitabuldi, Nagpur, MH"
                  className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 text-xs font-medium"
                />
              </div>
            </div>

            {/* 4. Preferred Language & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1 text-[11px]">
                  Preferred Language
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <select
                    value={preferredLang}
                    onChange={(e) => setPreferredLang(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600 text-xs font-medium"
                  >
                    <option>English</option>
                    <option>हिंदी (Hindi)</option>
                    <option>मराठी (Marathi)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1 text-[11px]">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 text-xs font-medium"
                  />
                </div>
              </div>
            </div>

            {/* 5. Mobile Number */}
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-[11px]">
                Registered Mobile Number (for SMS OTP)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98220 11902"
                  className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 text-xs font-mono font-medium"
                />
              </div>
            </div>

            {/* 6. Terms & Conditions Agreement */}
            <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-0"
              />
              <span className="text-[11px] text-slate-600 leading-tight">
                I agree to the <strong>National Labour Cooperatives Federation (NLCF)</strong>{" "}
                terms, 92% direct payout policy, and automated e-Shram trust deduction under the{" "}
                <strong>Code on Social Security 2020</strong>.
              </span>
            </label>

            {/* 7. OTP Verification Step */}
            {isOtpDispatched && (
              <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <label className="block text-blue-900 font-bold text-[11px]">
                    Enter 4-Digit SMS OTP
                  </label>
                  <span className="text-[10px] font-mono text-slate-500 font-medium">Resend in 28s</span>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    maxLength={4}
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    placeholder="4921"
                    className="w-full bg-white border border-blue-300 rounded-xl pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-mono tracking-widest text-sm text-center font-bold"
                    required
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {!isOtpDispatched ? (
              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full py-3 rounded-2xl font-bold btn-glossy-blue text-white shadow-md text-xs flex items-center justify-center gap-2 active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Send SMS Verification OTP</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={isAuthenticating}
                className={`w-full py-3 rounded-2xl font-extrabold text-white shadow-md flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 text-xs ${
                  authRole === "worker" ? "btn-glossy-green" : "btn-glossy-blue"
                }`}
              >
                <span>
                  {isAuthenticating
                    ? "Authenticating Sovereign Credentials..."
                    : `Verify & Enter ${authRole === "worker" ? "Artisan Portal" : "Consumer Marketplace"}`}
                </span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            )}
          </form>

          {/* Toggle between Create Account / Sign In */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => setIsNewUser(!isNewUser)}
              className="text-[11px] text-slate-500 hover:text-blue-600 font-semibold transition-colors"
            >
              {isNewUser
                ? "Already have a registered account? Sign In →"
                : "New artisan or citizen? Create New Account →"}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-2 text-xs text-slate-500">
        <p>© 2026 KaryaSetu (कार्यसेतु) • Aadhaar & NCD Sovereign e-KYC Public Rail</p>
      </div>
    </div>
  );
};

