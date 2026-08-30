"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { X, Mic, Volume2, Sparkles, Check, ArrowRight } from "lucide-react";

export const VoiceAssistantModal: React.FC = () => {
  const {
    isVoiceModalOpen,
    setIsVoiceModalOpen,
    language,
    speakText,
    incomingJobAlert,
    acceptJob,
    currentWorker,
    addToast,
  } = useApp();

  const [isListening, setIsListening] = useState(true);
  const [spokenPrompt, setSpokenPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const sampleCommands = [
    {
      text: "Where is my next job?",
      textHi: "मेरा अगला काम कहाँ है?",
      textMr: "माझे पुढचे काम कुठे आहे?",
      action: "locate",
    },
    {
      text: "Accept the direct booking request",
      textHi: "नया काम स्वीकार करो",
      textMr: "नवीन काम स्वीकारा",
      action: "accept",
    },
    {
      text: "How much did I earn today?",
      textHi: "आज मेरी कितनी कमाई हुई?",
      textMr: "आज माझी किती कमाई झाली?",
      action: "earnings",
    },
    {
      text: "Show my e-Shram pension balance",
      textHi: "मेरा ई-श्रम पेंशन फंड बैलेंस बताओ",
      textMr: "माझा ई-श्रम पेन्शन निधी दाखवा",
      action: "welfare",
    },
  ];

  const handleRunCommand = async (cmd: (typeof sampleCommands)[0]) => {
    const textToShow =
      language === "hi" ? cmd.textHi : language === "mr" ? cmd.textMr : cmd.text;
    setSpokenPrompt(textToShow);
    setIsListening(false);

    try {
      let reply = "";
      if (cmd.action === "earnings") {
        reply =
          language === "hi"
            ? `आज आपकी कुल कमाई ₹${currentWorker.todayEarnings} है, जो सीधे आपके UPI खाते में जमा हुई है।`
            : language === "mr"
            ? `आज तुमची एकूण कमाई ₹${currentWorker.todayEarnings} आहे.`
            : `Your direct take-home today is ₹${currentWorker.todayEarnings} settled via UPI.`;
      } else if (cmd.action === "welfare") {
        reply =
          language === "hi"
            ? `आज आपके ई-श्रम पेंशन ट्रस्ट में ₹${currentWorker.todayWelfareSaved} सुरक्षित जमा हुए हैं।`
            : `₹${currentWorker.todayWelfareSaved} allocated into your e-Shram social security fund today.`;
      } else if (cmd.action === "accept" && incomingJobAlert) {
        await acceptJob(incomingJobAlert.id);
        reply =
          language === "hi"
            ? `काम स्वीकार कर लिया गया है। ग्राहक को सूचित कर दिया गया है।`
            : `Booking confirmed. Navigating to customer location.`;
      } else {
        reply =
          language === "hi"
            ? `आपका अगला काम 1.2 किलोमीटर की दूरी पर है।`
            : `Your active job is 1.2 km away.`;
      }

      setAiResponse(reply);
      speakText(reply, language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-IN");
    } catch (e) {
      setAiResponse("Understood. Processing command.");
    }
  };

  if (!isVoiceModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in font-sans">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Bhashini AI Sovereign Voice Assistant
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Hands-free native voice commands for workers
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVoiceModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 text-center text-xs">
          {/* Animated Mic Visualizer */}
          <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Mic className="w-9 h-9" />
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">
              {isListening ? "Listening in your language..." : "Command Processed"}
            </h4>
            <p className="text-slate-500">
              Tap any quick command below or speak in English, Hindi, or Marathi:
            </p>
          </div>

          {spokenPrompt && (
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">You said:</span>
              <p className="text-slate-800 font-medium">{spokenPrompt}</p>
            </div>
          )}

          {aiResponse && (
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-left space-y-1 animate-in fade-in">
              <span className="text-[10px] font-bold uppercase text-emerald-700 block">
                Bhashini Voice Response:
              </span>
              <p className="text-emerald-950 font-bold">{aiResponse}</p>
            </div>
          )}

          {/* Preset Voice Action Chips */}
          <div className="space-y-2 text-left pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">
              Quick Voice Commands:
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {sampleCommands.map((cmd, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRunCommand(cmd)}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-950 text-left flex items-center justify-between transition-colors text-xs font-medium shadow-2xs"
                >
                  <span>
                    🎙️ {language === "hi" ? cmd.textHi : language === "mr" ? cmd.textMr : cmd.text}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
