"use client";

import React, { useState } from "react";
import { useApp, ActiveTab } from "@/context/AppContext";
import { KaryaSetuLogo } from "@/components/KaryaSetuLogo";
import {
  Zap,
  Globe,
  MapPin,
  Sparkles,
  Smartphone,
  Building2,
  Layers,
  Map,
  ShieldCheck,
  Play,
  HelpCircle,
  Database,
  Home,
  User,
  LogOut,
  ChevronDown,
  Lock,
} from "lucide-react";
import { Language } from "@/data/translations";
import { DatabaseModal } from "@/components/DatabaseModal";

export const Navbar: React.FC = () => {
  const {
    appSection,
    setAppSection,
    currentUser,
    loginUser,
    logoutUser,
    activeTab,
    setActiveTab,
    language,
    setLanguage,
    t,
    selectedCity,
    setSelectedCity,
    services,
    openBookingModal,
    setIsPricingModalOpen,
    simulateLiveDemoBooking,
    incomingJobAlert,
    dbConnected,
  } = useApp();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [dbModalOpen, setDbModalOpen] = useState(false);

  const navTabs: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: "customer",
      label: language === "hi" ? "उपभोक्ता बाज़ार" : language === "mr" ? "ग्राहक सेवा" : "Consumer Hub",
      icon: <Layers className="w-4 h-4" />,
    },
    {
      id: "worker",
      label: language === "hi" ? "कारीगर मोबाइल ऐप" : language === "mr" ? "कारागीर ॲप" : "Worker Mobile",
      icon: <Smartphone className="w-4 h-4" />,
      badge: incomingJobAlert ? "1 Alert" : undefined,
    },
    {
      id: "admin",
      label: language === "hi" ? "सहकारी संघ एडमिन" : language === "mr" ? "सहकारी केंद्र" : "Co-op Admin Hub",
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      id: "map",
      label: language === "hi" ? "लाइव भुवन मैप" : language === "mr" ? "थेट नकाशा" : "Live Bhuvan Map",
      icon: <Map className="w-4 h-4" />,
    },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇮🇳" },
    { code: "hi", label: "हिंदी (Hindi)", flag: "🇮🇳" },
    { code: "mr", label: "मराठी (Marathi)", flag: "🇮🇳" },
  ];

  const cities = ["Nagpur, MH", "Pune, MH", "Nashik, MH", "Wardha, MH"];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Left: Brand Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <KaryaSetuLogo
                size="md"
                showTagline={true}
                onClick={() => setAppSection("landing")}
              />

              <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 tracking-tight">
                v1.0-NLCF
              </span>

              {/* Live Database Badge */}
              <button
                onClick={() => setDbModalOpen(true)}
                className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors"
                title="Click to view SQLite Relational Database, tables, & audit logs"
              >
                <Database className="w-3 h-3 text-cyan-400" />
                <span>SQLite DB [🟢 ACTIVE]</span>
              </button>
            </div>

            {/* Center: View Switcher Nav Pills (When in App Section) */}
            {appSection === "app" ? (
              <nav className="hidden md:flex items-center p-1 rounded-xl bg-[#121314] border border-white/5 shadow-inner">
                {navTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/30"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                      {tab.badge && !isActive && (
                        <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-rose-500 text-white animate-pulse">
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            ) : (
              <div className="hidden md:flex items-center gap-4 text-xs font-medium text-zinc-400">
                <button
                  onClick={() => setAppSection("landing")}
                  className={`hover:text-white transition-colors ${
                    appSection === "landing" ? "text-emerald-400 font-bold" : ""
                  }`}
                >
                  Overview & Vision
                </button>
                <button
                  onClick={() => setIsPricingModalOpen(true)}
                  className="hover:text-white transition-colors"
                >
                  Fair Wage Architecture
                </button>
                <button
                  onClick={() => setAppSection("login")}
                  className={`hover:text-white transition-colors ${
                    appSection === "login" ? "text-emerald-400 font-bold" : ""
                  }`}
                >
                  Portal Login
                </button>
              </div>
            )}

            {/* Right Action Items */}
            <div className="flex items-center gap-2">
              {/* Home / Landing Page Toggle Button */}
              {appSection === "app" && (
                <button
                  onClick={() => setAppSection("landing")}
                  className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#121314] border border-white/10 text-zinc-300 hover:border-emerald-500/40 hover:text-white transition-colors"
                  title="Return to Public Landing Page"
                >
                  <Home className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Landing</span>
                </button>
              )}

              {/* Quick Live Demo Simulator Trigger */}
              <button
                onClick={simulateLiveDemoBooking}
                className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-amber-500/10 to-emerald-500/10 border border-amber-500/30 text-amber-300 hover:border-amber-400 transition-colors"
                title="Simulate an instant customer booking from ONDC network"
              >
                <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Simulate ONDC Lead</span>
              </button>

              {/* City Selector */}
              <div className="relative">
                <button
                  onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#121314] border border-white/10 text-zinc-300 hover:border-emerald-500/40 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">{selectedCity}</span>
                </button>

                {cityDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-36 py-1 bg-[#161719] border border-white/10 rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95">
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCity(city);
                          setCityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                          selectedCity === city
                            ? "text-emerald-400 font-semibold bg-emerald-500/10"
                            : "text-zinc-300 hover:bg-white/5"
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#121314] border border-white/10 text-zinc-300 hover:border-emerald-500/40 transition-colors"
                  aria-label="Select Language"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="uppercase font-mono">{language}</span>
                </button>

                {langDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 py-1 bg-[#161719] border border-white/10 rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between ${
                          language === l.code
                            ? "text-emerald-400 font-semibold bg-emerald-500/10"
                            : "text-zinc-300 hover:bg-white/5"
                        }`}
                      >
                        <span>{l.label}</span>
                        <span>{l.flag}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* User Profile / Role Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#161719] border border-white/10 text-zinc-200 hover:border-emerald-500/40 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline capitalize">
                    {currentUser ? currentUser.role : "Login"}
                  </span>
                  <ChevronDown className="w-3 h-3 text-zinc-500" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 py-2 bg-[#161719] border border-white/10 rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 text-xs">
                    <div className="px-3 py-1.5 border-b border-white/10 mb-1">
                      <span className="text-[10px] font-mono text-zinc-500 block uppercase">
                        Active Account
                      </span>
                      <strong className="text-white text-xs block truncate">
                        {currentUser ? currentUser.name : "Guest User"}
                      </strong>
                    </div>

                    <div className="px-2 space-y-1">
                      <button
                        onClick={() => {
                          loginUser("citizen");
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-zinc-300 flex items-center justify-between"
                      >
                        <span>👤 Switch to Citizen</span>
                        <span className="text-[10px] text-emerald-400">Hub</span>
                      </button>

                      <button
                        onClick={() => {
                          loginUser("artisan");
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-zinc-300 flex items-center justify-between"
                      >
                        <span>🛠️ Switch to Artisan</span>
                        <span className="text-[10px] text-emerald-400">#4012</span>
                      </button>

                      <button
                        onClick={() => {
                          loginUser("admin");
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-zinc-300 flex items-center justify-between"
                      >
                        <span>🏢 Switch to Co-op Admin</span>
                        <span className="text-[10px] text-emerald-400">LFC</span>
                      </button>
                    </div>

                    <div className="border-t border-white/10 mt-1.5 pt-1 px-2">
                      <button
                        onClick={() => {
                          setAppSection("login");
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-amber-300 flex items-center gap-1.5"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Open Login Portal</span>
                      </button>

                      <button
                        onClick={() => {
                          logoutUser();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-rose-400 flex items-center gap-1.5"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Primary CTA */}
              {appSection === "landing" ? (
                <button
                  onClick={() => setAppSection("app")}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-black hover:from-emerald-400 hover:to-teal-400 transition-all duration-200 shadow-md shadow-emerald-500/25 active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-black" />
                  <span>Launch App</span>
                </button>
              ) : (
                <button
                  onClick={() => openBookingModal(services[0])}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-black hover:from-emerald-400 hover:to-teal-400 transition-all duration-200 shadow-md shadow-emerald-500/25 active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-black" />
                  <span>{t.bookArtisan}</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile View Switcher Tab bar (When in App Section) */}
          {appSection === "app" && (
            <div className="flex md:hidden items-center justify-between pb-2.5 pt-1 overflow-x-auto gap-1 border-t border-white/5">
              {navTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors ${
                      isActive
                        ? "bg-emerald-500 text-black font-semibold shadow-sm"
                        : "text-zinc-400 bg-[#121314] hover:text-white"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                    {tab.badge && !isActive && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </header>

      {/* Database Inspector Modal */}
      <DatabaseModal isOpen={dbModalOpen} onClose={() => setDbModalOpen(false)} />
    </>
  );
};
