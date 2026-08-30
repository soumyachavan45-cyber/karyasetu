"use client";

import React from "react";
import { useApp, ActiveTab } from "@/context/AppContext";
import { Layers, Smartphone, Map, User } from "lucide-react";

export const BottomNav: React.FC = () => {
  const { appSection, activeTab, setActiveTab, incomingJobAlert } = useApp();

  if (appSection === "landing" || appSection === "login") {
    return null;
  }

  const navItems = [
    {
      id: "customer" as ActiveTab,
      label: "Services",
      icon: Layers,
    },
    {
      id: "worker" as ActiveTab,
      label: "Worker Hub",
      icon: Smartphone,
      badge: incomingJobAlert ? "1" : undefined,
    },
    {
      id: "map" as ActiveTab,
      label: "India Map",
      icon: Map,
    },
    {
      id: "account" as ActiveTab,
      label: "Account",
      icon: User,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-3 py-1.5 shadow-2xl flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 min-w-[64px] ${
              isActive
                ? "text-blue-600 font-bold scale-105"
                : "text-slate-500 hover:text-slate-800 font-medium"
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
              {item.badge && (
                <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5">{item.label}</span>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-0.5 animate-in fade-in" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
