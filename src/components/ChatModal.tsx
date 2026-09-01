"use client";

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { X, Send, Phone, User, ShieldCheck, Clock, Sparkles } from "lucide-react";

export interface ChatMessage {
  id: string;
  sender: "customer" | "worker";
  text: string;
  time: string;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  workerName: string;
  workerPhone: string;
  workerTrade: string;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  workerName,
  workerPhone,
  workerTrade,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m1",
      sender: "worker",
      text: "Namaste! I have accepted your request and started heading towards your location.",
      time: "Just now",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    "I am at the main gate.",
    "What is your current ETA?",
    "Please bring replacement parts/switches.",
    "OTP is ready with me.",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: "m_" + Date.now(),
      sender: "customer",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");

    // Simulate worker smart reply
    setTimeout(() => {
      let replyText = "Received! I am following GPS on ISRO Bhuvan radar. Arriving soon.";
      if (text.toLowerCase().includes("eta") || text.toLowerCase().includes("time")) {
        replyText = "My current ETA is approximately 8 to 12 minutes based on traffic.";
      } else if (text.toLowerCase().includes("gate")) {
        replyText = "Understood. I will ring your bell or call you once I reach the main gate.";
      }

      const workerReply: ChatMessage = {
        id: "m_w_" + Date.now(),
        sender: "worker",
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, workerReply]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[560px]">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center font-bold text-blue-700 shadow-2xs">
                {workerName.charAt(0)}
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span>{workerName}</span>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-full font-bold">
                  VERIFIED
                </span>
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">{workerTrade} • En-Route</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${workerPhone}`}
              className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors shadow-2xs"
              title={`Direct Call: ${workerPhone}`}
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Verified Contact Banner */}
        <div className="px-4 py-2 bg-emerald-50 border-b border-emerald-200 flex items-center justify-between text-[11px] text-slate-700 font-medium">
          <span className="flex items-center gap-1 text-emerald-800 font-mono font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Direct Call: {workerPhone}
          </span>
          <span className="text-[10px] text-slate-500 font-mono">End-to-End Encrypted</span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === "customer" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === "customer"
                    ? "btn-glossy-blue text-white font-medium rounded-br-none shadow-sm"
                    : "bg-slate-100 text-slate-900 border border-slate-200/80 rounded-bl-none shadow-2xs"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[9px] font-mono text-slate-400 mt-1 px-1">{msg.time}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-slate-50/80 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[10px]">
          {quickReplies.map((reply, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(reply)}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 whitespace-nowrap transition-colors shadow-2xs font-medium"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 border-t border-slate-200 bg-slate-50/80 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message to your artisan..."
            className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-medium"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl btn-glossy-blue text-white shadow-xs shrink-0 active:scale-95 transition-transform"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

