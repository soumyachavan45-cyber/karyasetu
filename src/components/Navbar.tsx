"use client";

import React, { useState } from "react";
import { useApp, ActiveTab } from "@/context/AppContext";
import { KaryaSetuLogo } from "@/components/KaryaSetuLogo";
import {
  Globe,
  MapPin,
  Sparkles,
  Smartphone,
  Layers,
  Map,
  Home,
  User,
  LogOut,
  ChevronDown,
  Lock,
  Search,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Language } from "@/data/translations";
import { INDIA_CITIES } from "@/data/mockData";

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
    incomingJobAlert,
  } = useApp();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navTabs: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: "customer",
      label: language === "hi" ? "सेवाएं (बाज़ार)" : language === "mr" ? "सेवा बाज़ार" : "Consumer Marketplace",
      icon: <Layers className="w-4 h-4" />,
    },
    {
      id: "worker",
      label: language === "hi" ? "कारीगर पोर्टल" : language === "mr" ? "कारागीर पोर्टल" : "Worker Dashboard",
      icon: <Smartphone className="w-4 h-4" />,
      badge: incomingJobAlert ? "1 Alert" : undefined,
    },
    {
      id: "map",
      label: language === "hi" ? "भारत मैप" : language === "mr" ? "भारत नकाशा" : "India Map",
      icon: <Map className="w-4 h-4" />,
    },
    {
      id: "account",
      label: language === "hi" ? "प्रोफ़ाइल खाता" : language === "mr" ? "माझे खाते" : "My Account",
      icon: <User className="w-4 h-4" />,
    },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇮🇳" },
    { code: "hi", label: "हिंदी (Hindi)", flag: "🇮🇳" },
    { code: "mr", label: "मराठी (Marathi)", flag: "🇮🇳" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 gap-1.5 sm:gap-3 w-full">
          
          {/* Left: Brand Logo & Sovereign Badge */}
          <div className="flex items-center gap-2 shrink-0">
            <KaryaSetuLogo
              size="md"
              showTagline={true}
              onClick={() => setAppSection("landing")}
            />

            <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200 font-semibold tracking-tight">
              v2.0 • Sovereign Rail
            </span>
          </div>

          {/* Center: View Switcher Nav Pills (Desktop Only) */}
          {appSection === "app" ? (
            <nav className="hidden lg:flex items-center p-1 rounded-2xl bg-slate-100/90 border border-slate-200/80 shadow-inner">
              {navTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-white text-blue-700 shadow-md shadow-slate-200 font-bold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
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
            <div className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-600">
              <button
                onClick={() => setAppSection("landing")}
                className={`hover:text-blue-600 transition-colors ${
                  appSection === "landing" ? "text-blue-600 font-bold" : ""
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setIsPricingModalOpen(true)}
                className="hover:text-blue-600 transition-colors"
              >
                Fair Wage Architecture
              </button>
              <button
                onClick={() => {
                  loginUser("citizen");
                  setActiveTab("map");
                }}
                className="hover:text-blue-600 transition-colors"
              >
                Presence Map
              </button>
              <button
                onClick={() => setAppSection("login")}
                className={`hover:text-blue-600 transition-colors ${
                  appSection === "login" ? "text-blue-600 font-bold" : ""
                }`}
              >
                Portal Login
              </button>
            </div>
          )}

          {/* Right Action Items: Responsive, Compact, Zero Overflow */}
          <div className="flex items-center justify-end gap-1 sm:gap-2 shrink-0">
            
            {/* City Selector */}
            <div className="relative shrink-0">
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-white transition-colors shadow-2xs"
                title={`Current City: ${selectedCity}`}
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="max-w-[48px] xs:max-w-[70px] sm:max-w-[100px] truncate text-[11px] sm:text-xs font-semibold text-slate-800">
                  {selectedCity.split(",")[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400 shrink-0 hidden xs:inline" />
              </button>

              {cityDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 max-h-72 overflow-y-auto py-1 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 text-xs">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 sticky top-0 bg-white">
                    Select City (Across India)
                  </div>
                  {INDIA_CITIES.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setSelectedCity(`${c.name}, ${c.state}`);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 transition-colors flex items-center justify-between ${
                        selectedCity.includes(c.name)
                          ? "text-blue-600 font-bold bg-blue-50/80"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div>
                        <strong className="block">{c.name}</strong>
                        <span className="text-[10px] text-slate-400 font-normal">{c.state}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {c.activeArtisans} Active
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector (Desktop / Tablet) */}
            <div className="relative shrink-0 hidden md:block">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 hover:border-blue-400 transition-colors shadow-2xs"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span className="uppercase font-mono font-bold text-[11px]">{language}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 py-1 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 animate-in fade-in zoom-in-95 text-xs">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 transition-colors flex items-center justify-between ${
                        language === l.code
                          ? "text-blue-600 font-bold bg-blue-50"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{l.label}</span>
                      <span>{l.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile / Role Dropdown - Fully Visible and Prominent on Mobile & Desktop */}
            <div className="relative shrink-0">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-bold bg-white/90 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors shadow-2xs"
                aria-label="Current User Profile"
              >
                <div className={`w-5 h-5 rounded-full text-white flex items-center justify-center text-[10px] font-bold shadow-xs ${
                  currentUser?.role === "artisan" ? "bg-emerald-600" : "bg-blue-600"
                }`}>
                  {currentUser?.role === "artisan" ? "🛠️" : "👤"}
                </div>
                <span className="text-[11px] font-bold text-slate-800 capitalize max-w-[55px] sm:max-w-none truncate">
                  {currentUser ? (currentUser.role === "artisan" ? "Artisan" : "Citizen") : "Profile"}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 py-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 text-xs">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                      Current Profile
                    </span>
                    <strong className="text-slate-900 text-xs block truncate font-black">
                      {currentUser ? currentUser.name : "Guest Citizen"}
                    </strong>
                    <span className={`text-[10px] font-bold inline-block px-1.5 py-0.2 rounded mt-0.5 capitalize ${
                      currentUser?.role === "artisan"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {currentUser?.role === "artisan" ? "Artisan (Worker)" : "Citizen (Consumer)"}
                    </span>
                  </div>

                  <div className="px-2 space-y-1">
                    <button
                      onClick={() => {
                        loginUser("citizen");
                        setUserDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl transition-colors flex items-center justify-between ${
                        currentUser?.role === "citizen" ? "bg-blue-50 text-blue-700 font-bold" : "hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>👤</span>
                        <span>Citizen Mode</span>
                      </span>
                      <span className="text-[10px] text-blue-600 font-bold">Hire</span>
                    </button>

                    <button
                      onClick={() => {
                        loginUser("artisan");
                        setUserDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl transition-colors flex items-center justify-between ${
                        currentUser?.role === "artisan" ? "bg-emerald-50 text-emerald-700 font-bold" : "hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>🛠️</span>
                        <span>Artisan Mode</span>
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold">Earn</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("account");
                        setAppSection("app");
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-blue-50 text-blue-700 font-semibold flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>View Account & Records</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 mt-1.5 pt-1 px-2">
                    <button
                      onClick={() => {
                        setAppSection("login");
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-slate-100 text-slate-600 flex items-center gap-2"
                    >
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Switch Login Account</span>
                    </button>

                    <button
                      onClick={() => {
                        logoutUser();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-rose-50 text-rose-600 font-semibold flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Primary Action Button: "Book Service" / "Explore" - Guaranteed Zero Horizontal Overflow */}
            {appSection === "landing" ? (
              <button
                onClick={() => {
                  loginUser("citizen");
                  setActiveTab("customer");
                }}
                className="shrink-0 flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 xs:px-3.5 sm:px-4 py-1.5 rounded-xl text-xs font-bold btn-glossy-blue shadow-xs active:scale-95 transition-all duration-150 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Explore</span>
              </button>
            ) : (
              <button
                onClick={() => openBookingModal(services[0])}
                className="shrink-0 flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 xs:px-3.5 sm:px-4 py-1.5 rounded-xl text-xs font-bold btn-glossy-green shadow-xs active:scale-95 transition-all duration-150 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden xs:inline">Book Service</span>
                <span className="xs:hidden">Book</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};


