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
    md: "w-8 h-8 text-sm",
    lg: "w-11 h-11 text-base",
    xl: "w-14 h-14 text-xl",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base font-bold",
    lg: "text-xl font-bold",
    xl: "text-2xl sm:text-3xl font-extrabold",
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
      className={`flex items-center gap-2.5 select-none ${onClick ? "cursor-pointer group" : ""} ${className}`}
    >
      {/* House + Bridge Emblem matching reference design */}
      <div
        className={`${iconSizes[size]} shrink-0 relative rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-sky-600 p-0.5 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-all duration-300`}
      >
        <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center relative overflow-hidden">
          <svg
            viewBox="0 0 40 40"
            className="w-4/5 h-4/5 text-emerald-600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* House roof */}
            <path
              d="M8 20L20 8L32 20"
              stroke="#16A34A"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Bridge arch under house */}
            <path
              d="M12 28C12 21 28 21 28 28"
              stroke="#2563EB"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Center sun dot / doorway */}
            <circle cx="20" cy="17" r="2.8" fill="#F59E0B" />
          </svg>
        </div>
      </div>

      {/* Typography */}
      <div className="flex flex-col shrink-0">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`${textSizes[size]} tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1 font-sans`}
          >
            <span className="font-extrabold">Karya</span>
            <span className="font-semibold text-blue-600">Setu</span>
          </span>
        </div>

        {showTagline && (
          <div className="hidden sm:flex items-center gap-1.5 mt-0.5">
            <span
              className={`${devanagariSizes[size]} font-semibold text-emerald-700 font-devanagari tracking-wide`}
            >
              कार्यसेतु
            </span>
            <span className="text-[9px] font-mono text-slate-500 tracking-wider uppercase">
              • NLCF
            </span>
          </div>
        )}
      </div>

    </div>
  );
};

