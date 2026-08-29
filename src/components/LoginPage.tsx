"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { KaryaSetuLogo } from "@/components/KaryaSetuLogo";
import {
  User,
  Smartphone,
  Building2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Phone,
  KeyRound,
  Sparkles,
  Mic,
  ArrowLeft,
  CheckCircle2,
  Zap,
} from "lucide-react";

export type UserRole = "citizen" | "artisan" | "admin";

export const LoginPage: React.FC<{
  onSuccess: (role: UserRole) => void;
  onBackToLanding: () => void;
}> = ({ onSuccess, onBackToLanding }) => {
  const { addToast, speakText, language } = useApp();

  const [selectedRole, setSelectedRole] = useState<UserRole>("citizen");
  const [phone, setPhone] = useState("+91 98220 11902");
  const [uanOrAadhaar, setUanOrAadhaar] = useState("UAN-8890-4412-9901");
  const [adminId, setAdminId] = useState("NLCF-MH-NAGPUR-01");
  const [otpOrPin, setOtpOrPin] = useState("4921");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = () => {
    setIsOtpSent(true);
    addToast(
      "OTP Dispatched via SMS & Aadhaar Gateway",
      `Use OTP code '4921' to verify authentication.`,
      "info"
    );
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      addToast(
        "Authentication Successful! 🛡️",
        `Welcome to KaryaSetu (${selectedRole.toUpperCase()} Portal).`,
        "success"
      );
      onSuccess(selectedRole);
    }, 600);
  };

  // Quick 1-Click Demo Login Shortcuts
  const handleQuickDemoLogin = (role: UserRole) => {
    setSelectedRole(role);
    if (role === "citizen") {
      setPhone("+91 98220 11902");
    } else if (role === "artisan") {
      setUanOrAadhaar("UAN-8890-4412-9901");
      setPhone("+91 98231 44012");
    } else {
      setAdminId("NLCF-MH-NAGPUR-01");
      setOtpOrPin("7889");
    }

    addToast(
      `Demo ${role.toUpperCase()} Profile Loaded`,
      "Logging in automatically...",
      "success"
    );

    setTimeout(() => {
      onSuccess(role);
    }, 400);
  };

  // Voice Login Action
  const handleVoiceLogin = () => {
    speakText(
      language === "hi"
        ? "नमस्ते रमेश कुमार! आपकी आवाज़ सत्यापित हो गई है। कारीगर पोर्टल में आपका स्वागत है।"
        : language === "mr"
        ? "नमस्कार रमेश कुमार! तुमचा आवाज सत्यापित झाला आहे."
        : "Voice biometric verified for Ramesh Kumar. Logging in...",
      language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-IN"
    );

    setTimeout(() => {
      handleQuickDemoLogin("artisan");
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-[#0B0B0C] text-zinc-100 flex flex-col justify-between p-4 sm:p-6 relative selection:bg-emerald-500 selection:text-black">
      {/* Soft Ambient Radial Backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-radial-ambient pointer-events-none z-0" />

      {/* Top Header */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between py-2">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#121314] text-zinc-300 border border-white/10 hover:border-emerald-500/40 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Back to Landing Page</span>
        </button>

        <KaryaSetuLogo size="sm" showTagline={false} />
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 max-w-md mx-auto w-full my-auto py-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#121314] border border-white/10 shadow-2xl shadow-black space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              KaryaSetu Portal Login
            </h2>
            <p className="text-xs text-zinc-400">
              Sovereign Role-Based Authentication (Aadhaar / e-Shram / OTP)
            </p>
          </div>

          {/* Role Switcher Pills */}
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#161719] border border-white/5 text-xs">
            {[
              { id: "citizen", label: "Citizen 👤", icon: <User className="w-3.5 h-3.5" /> },
              { id: "artisan", label: "Artisan 🛠️", icon: <Smartphone className="w-3.5 h-3.5" /> },
              { id: "admin", label: "Admin 🏢", icon: <Building2 className="w-3.5 h-3.5" /> },
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  setSelectedRole(r.id as UserRole);
                  setIsOtpSent(false);
                }}
                className={`py-2 rounded-lg font-semibold transition-all text-[11px] ${
                  selectedRole === r.id
                    ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20 font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            {/* Citizen Fields */}
            {selectedRole === "citizen" && (
              <>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Mobile Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98220 XXXXX"
                      className="w-full bg-[#161719] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono text-xs"
                      required
                    />
                  </div>
                </div>

                {isOtpSent && (
                  <div className="animate-in fade-in">
                    <label className="block text-zinc-300 font-medium mb-1">
                      Enter 4-Digit SMS OTP
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        maxLength={4}
                        value={otpOrPin}
                        onChange={(e) => setOtpOrPin(e.target.value)}
                        placeholder="e.g. 4921"
                        className="w-full bg-[#161719] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono tracking-widest text-sm text-center"
                        required
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Artisan Fields */}
            {selectedRole === "artisan" && (
              <>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    e-Shram UAN / Aadhaar Identity Number
                  </label>
                  <div className="relative">
                    <ShieldCheck className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={uanOrAadhaar}
                      onChange={(e) => setUanOrAadhaar(e.target.value)}
                      placeholder="UAN-8890-4412-9901"
                      className="w-full bg-[#161719] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono text-xs"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Registered Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98231 44012"
                      className="w-full bg-[#161719] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono text-xs"
                      required
                    />
                  </div>
                </div>

                {/* Bhashini Voice Login Button */}
                <button
                  type="button"
                  onClick={handleVoiceLogin}
                  className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-300 font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Mic className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>🎙️ Voice Biometric Login (Bhashini AI)</span>
                </button>
              </>
            )}

            {/* Admin Fields */}
            {selectedRole === "admin" && (
              <>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Federation Hub ID (LFC / NCD Reg No)
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={adminId}
                      onChange={(e) => setAdminId(e.target.value)}
                      placeholder="NLCF-MH-NAGPUR-01"
                      className="w-full bg-[#161719] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono text-xs"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Security Passcode / PIN
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      value={otpOrPin}
                      onChange={(e) => setOtpOrPin(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#161719] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono text-xs"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Submit Action */}
            {selectedRole === "citizen" && !isOtpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full py-2.5 rounded-xl font-bold bg-emerald-500 text-black hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
              >
                Send Verification OTP
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-black hover:from-emerald-400 hover:to-teal-300 transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
              >
                <span>{isLoading ? "Authenticating..." : `Login to ${selectedRole.toUpperCase()} Hub`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Quick Demo Shortcuts */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block text-center">
              Quick 1-Click Demo Profiles:
            </span>

            <div className="grid grid-cols-1 gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("citizen")}
                className="p-2 rounded-xl bg-[#161719] hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 text-left text-xs text-zinc-300 hover:text-white flex items-center justify-between transition-colors"
              >
                <span>👤 Citizen: <strong>Vikas Deshpande</strong> (Customer)</span>
                <span className="text-[10px] text-emerald-400 font-bold">1-Click →</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin("artisan")}
                className="p-2 rounded-xl bg-[#161719] hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 text-left text-xs text-zinc-300 hover:text-white flex items-center justify-between transition-colors"
              >
                <span>🛠️ Artisan: <strong>Ramesh Kumar</strong> (#4012)</span>
                <span className="text-[10px] text-emerald-400 font-bold">1-Click →</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin("admin")}
                className="p-2 rounded-xl bg-[#161719] hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 text-left text-xs text-zinc-300 hover:text-white flex items-center justify-between transition-colors"
              >
                <span>🏢 Co-op Admin: <strong>Nagpur Federation LFC</strong></span>
                <span className="text-[10px] text-emerald-400 font-bold">1-Click →</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-2 text-xs text-zinc-500">
        <p>KaryaSetu (कार्यसेतु) • Aadhaar & NCD e-KYC Security Rails</p>
      </div>
    </div>
  );
};
