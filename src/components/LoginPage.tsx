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
} from "lucide-react";

export type UserRole = "citizen" | "artisan";

export const LoginPage: React.FC<{
  onSuccess: (role: UserRole) => void;
  onBackToLanding: () => void;
}> = ({ onSuccess, onBackToLanding }) => {
  const { addToast, speakText, language } = useApp();

  const [selectedRole, setSelectedRole] = useState<UserRole>("citizen");
  const [phone, setPhone] = useState("+91 98220 11902");
  const [uanOrAadhaar, setUanOrAadhaar] = useState("UAN-8890-5012-9901");
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
        `Welcome to KaryaSetu (${selectedRole === "artisan" ? "Artisan / Worker" : "Citizen / Consumer"} Portal).`,
        "success"
      );
      onSuccess(selectedRole);
    }, 500);
  };

  // Quick 1-Click Demo Login Shortcuts
  const handleQuickDemoLogin = (role: UserRole) => {
    setSelectedRole(role);
    if (role === "citizen") {
      setPhone("+91 98220 11902");
    } else {
      setUanOrAadhaar("UAN-8890-5012-9901");
      setPhone("+91 98221 55012");
    }

    addToast(
      `Demo ${role === "artisan" ? "Artisan" : "Citizen"} Profile Loaded`,
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
        ? "नमस्ते विद्या देशमुख! आपकी आवाज़ सत्यापित हो गई है। कारीगर पोर्टल में आपका स्वागत है।"
        : language === "mr"
        ? "नमस्कार विद्या देशमुख! तुमचा आवाज सत्यापित झाला आहे."
        : "Voice biometric verified for Vidya Deshmukh. Logging in...",
      language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-IN"
    );

    setTimeout(() => {
      handleQuickDemoLogin("artisan");
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-transparent text-slate-900 flex flex-col justify-between p-4 sm:p-6 relative selection:bg-blue-600 selection:text-white font-sans">
      {/* Top Header */}

      <div className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between py-2">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-blue-600" />
          <span>Back to Home</span>
        </button>

        <KaryaSetuLogo size="sm" showTagline={false} />
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 max-w-md mx-auto w-full my-auto py-6">
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white shadow-2xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-1.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center mx-auto text-blue-600 shadow-sm">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Portal Authentication
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Aadhaar & e-Shram Sovereign Security Rails
            </p>
          </div>

          {/* Role Switcher Pills (Citizen vs Artisan) */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-100/90 border border-slate-200 text-xs">
            {[
              { id: "citizen", label: "Citizen / Consumer 👤", icon: <User className="w-3.5 h-3.5" /> },
              { id: "artisan", label: "Artisan / Worker 🛠️", icon: <Smartphone className="w-3.5 h-3.5" /> },
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  setSelectedRole(r.id as UserRole);
                  setIsOtpSent(false);
                }}
                className={`py-2.5 rounded-xl font-bold transition-all text-xs flex items-center justify-center gap-1.5 ${
                  selectedRole === r.id
                    ? r.id === "citizen"
                      ? "btn-glossy-blue shadow-md text-white font-extrabold"
                      : "btn-glossy-green shadow-md text-white font-extrabold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
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
                  <label className="block text-slate-700 font-semibold mb-1">
                    Mobile Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98220 XXXXX"
                      className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-mono text-xs shadow-inner font-medium"
                      required
                    />
                  </div>
                </div>

                {isOtpSent && (
                  <div className="animate-in fade-in">
                    <label className="block text-slate-700 font-semibold mb-1">
                      Enter 4-Digit SMS OTP
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        maxLength={4}
                        value={otpOrPin}
                        onChange={(e) => setOtpOrPin(e.target.value)}
                        placeholder="4921"
                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-mono tracking-widest text-sm text-center font-bold shadow-inner"
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
                  <label className="block text-slate-700 font-semibold mb-1">
                    e-Shram UAN / Aadhaar Identity Number
                  </label>
                  <div className="relative">
                    <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={uanOrAadhaar}
                      onChange={(e) => setUanOrAadhaar(e.target.value)}
                      placeholder="UAN-8890-5012-9901"
                      className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-mono text-xs shadow-inner font-medium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Registered Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98221 55012"
                      className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-mono text-xs shadow-inner font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Bhashini Voice Login Button */}
                <button
                  type="button"
                  onClick={handleVoiceLogin}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-300 hover:border-emerald-500 text-emerald-800 font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Mic className="w-4 h-4 text-emerald-600 animate-pulse" />
                  <span>🎙️ Voice Biometric Login (Bhashini AI)</span>
                </button>
              </>
            )}

            {/* Submit Action */}
            {selectedRole === "citizen" && !isOtpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full py-3 rounded-xl font-bold btn-glossy-blue text-white shadow-md transition-all active:scale-95"
              >
                Send Verification OTP
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-xl font-bold text-white shadow-md flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50 transition-all ${
                  selectedRole === "artisan"
                    ? "btn-glossy-green"
                    : "btn-glossy-blue"
                }`}
              >
                <span>{isLoading ? "Authenticating..." : `Launch ${selectedRole === "artisan" ? "Artisan" : "Consumer"} Portal`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Quick Demo Shortcuts */}
          <div className="pt-4 border-t border-slate-200/80 space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block text-center">
              1-Click Demo Profiles:
            </span>

            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("citizen")}
                className="p-2.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left text-xs text-slate-700 hover:text-blue-900 flex items-center justify-between transition-colors shadow-sm"
              >
                <span>👤 Citizen Profile: <strong>Vikas Deshpande</strong></span>
                <span className="text-[11px] text-blue-600 font-bold">1-Click →</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin("artisan")}
                className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left text-xs text-slate-700 hover:text-emerald-900 flex items-center justify-between transition-colors shadow-sm"
              >
                <span>🛠️ Artisan Profile: <strong>Vidya Deshmukh</strong></span>
                <span className="text-[11px] text-emerald-600 font-bold">1-Click →</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-2 text-xs text-slate-500 font-medium">
        <p>KaryaSetu (कार्यसेतु) • Sovereign Digital Public Infrastructure</p>
      </div>
    </div>
  );
};

