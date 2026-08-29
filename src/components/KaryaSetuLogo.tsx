"use client";

import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const KaryaSetuLogo: React.FC<LogoProps> = ({
  size = "md",
  showTagline = true,
  className = "",
  onClick,
}) => {
  const iconSizes = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-xl",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
    xl: "text-2xl sm:text-3xl",
  };

  const devanagariSizes = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
    xl: "text-base sm:text-lg",
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 select-none ${onClick ? "cursor-pointer group" : ""} ${className}`}
    >
      {/* Sanskrit-Modern Geometric Bridge Emblem */}
      <div
        className={`${iconSizes[size]} relative rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-700 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 group-hover:shadow-emerald-500/40 transition-all duration-300`}
      >
        <div className="w-full h-full bg-[#0B0B0C] rounded-[14px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle glowing bridge ligature */}
          <svg
            viewBox="0 0 40 40"
            className="w-4/5 h-4/5 text-emerald-400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Upper Shirorekha (Top Sanskrit bar) */}
            <path
              d="M6 10H34"
              stroke="#34D399"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* The Setu Arch / Connecting Bridge */}
            <path
              d="M9 28C9 18 31 18 31 28"
              stroke="url(#bridgeGradient)"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Central Pillar of Dignity */}
            <path
              d="M20 10V22"
              stroke="#10B981"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Saffron Bindu / Sovereign Dot */}
            <circle cx="20" cy="6" r="2" fill="#F59E0B" />
            <circle cx="12" cy="28" r="1.5" fill="#34D399" />
            <circle cx="28" cy="28" r="1.5" fill="#34D399" />

            <defs>
              <linearGradient id="bridgeGradient" x1="9" y1="28" x2="31" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#10B981" />
                <stop offset="0.5" stopColor="#F59E0B" />
                <stop offset="1" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Typography Block with Sanskrit modern styling */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`${textSizes[size]} font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1`}
          >
            <span>KaryaSetu</span>
          </span>
          <span className="text-xs">🇮🇳</span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`${devanagariSizes[size]} font-semibold text-emerald-400/90 font-devanagari tracking-wide`}
            >
              कार्यसेतु
            </span>
            <span className="text-[9px] font-mono text-zinc-400 tracking-wider uppercase">
              • NLCF CO-OP
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
