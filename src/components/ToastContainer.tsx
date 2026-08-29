"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { CheckCircle2, Info, AlertTriangle, AlertCircle, X } from "lucide-react";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case "success":
              return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />;
            case "warning":
              return <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />;
            case "alert":
              return <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />;
            default:
              return <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />;
          }
        };

        const getBorderColor = () => {
          switch (toast.type) {
            case "success":
              return "border-emerald-500/40 bg-[#10B981]/5";
            case "warning":
              return "border-amber-500/40 bg-[#F59E0B]/5";
            case "alert":
              return "border-rose-500/40 bg-[#EF4444]/5";
            default:
              return "border-cyan-500/40 bg-[#06B6D4]/5";
          }
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl bg-[#121314]/95 backdrop-blur-xl border ${getBorderColor()} shadow-2xl shadow-black/80 transition-all duration-300 animate-in slide-in-from-bottom-3`}
          >
            {getIcon()}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-semibold text-white tracking-wide truncate">
                  {toast.title}
                </h4>
                <span className="text-[10px] text-zinc-500 font-mono">{toast.timestamp}</span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed break-words">
                {toast.description}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
