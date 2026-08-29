"use client";

import React, { useState, useEffect } from "react";
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
      text: "Accept the fan repair request",
      textHi: "पंखा रिपेयर का काम स्वीकार करो",
      textMr: "पंखा दुरुस्तीचे काम स्वीकारा",
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
      // Call Sovereign Bhashini AI NLP backend endpoint
      const res = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToShow, language }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.speechOutput) {
          setAiResponse(json.speechOutput);
          speakText(json.speechOutput, language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-IN");
          if (cmd.action === "accept" && incomingJobAlert) {
            await acceptJob(incomingJobAlert.id);
          }
          return;
        }
      }
    } catch (e) {}

    // Fallback local logic
    if (cmd.action === "locate") {
      const resp =
        language === "hi"
          ? "आपका अगला काम दिघोरी, नागपुर में है (2.1 किमी दूर)। पंखा व स्विच रिपेयर के लिए ₹320 का सीधा भुगतान मिलेगा।"
          : language === "mr"
          ? "तुमचे पुढचे काम दिघोरी, नागपूर येथे आहे (२.१ किमी अंतरावर). ₹३२० चा थेट मोबदला मिळेल."
          : "Your next request is in Dighori, Nagpur (2.1 km away). Payout is ₹320 directly via UPI.";
      setAiResponse(resp);
      speakText(resp, language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-IN");
    } else if (cmd.action === "accept") {
      if (incomingJobAlert) {
        await acceptJob(incomingJobAlert.id);
      }
      const resp =
        language === "hi"
          ? "काम सफलतापूर्वक स्वीकार कर लिया गया है। ग्राहक को आपका आगमन समय भेज दिया गया है।"
          : language === "mr"
          ? "काम यशस्वीरित्या स्वीकारले आहे. ग्राहकाला संदेश पाठवला आहे."
          : "Job accepted successfully. Route navigation active.";
      setAiResponse(resp);
      speakText(resp, language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-IN");
    } else if (cmd.action === "earnings") {
      const resp =
        language === "hi"
          ? `आज की आपकी कुल कमाई ₹${currentWorker.todayEarnings} है, जो 92% UPI द्वारा सीधे बैंक में जमा हो चुकी है।`
          : language === "mr"
          ? `आजची तुमची एकूण कमाई ₹${currentWorker.todayEarnings} आहे.`
          : `Your earnings today are ₹${currentWorker.todayEarnings}, transferred directly to your bank account.`;
      setAiResponse(resp);
      speakText(resp, language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-IN");
    } else if (cmd.action === "welfare") {
      const resp =
        language === "hi"
          ? `आपके ई-श्रम सामाजिक सुरक्षा फंड में आज ₹${currentWorker.todayWelfareSaved} सुरक्षित जमा किए गए हैं। स्थिति: पूर्णतः सुरक्षित।`
          : language === "mr"
          ? `तुमच्या ई-श्रम पेन्शन खात्यात आज ₹${currentWorker.todayWelfareSaved} जमा झाले आहेत.`
          : `₹${currentWorker.todayWelfareSaved} allocated today to your e-Shram Accident & Pension Fund. Status: Fully Secured.`;
      setAiResponse(resp);
      speakText(resp, language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-IN");
    }
  };

  useEffect(() => {
    if (isVoiceModalOpen) {
      setIsListening(true);
      setSpokenPrompt("");
      setAiResponse("");
    }
  }, [isVoiceModalOpen]);

  if (!isVoiceModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#121314] border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col p-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>Bhashini AI Voice Assistant</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded">
                  BHASHINI-v2
                </span>
              </h3>
              <p className="text-[11px] text-zinc-400">
                Government of India Sovereign Multilingual Speech Engine
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVoiceModalOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visualizer and Status */}
        <div className="py-6 text-center space-y-4">
          <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
            {/* Wave animation circles */}
            <div
              className={`absolute inset-0 rounded-full bg-emerald-500/20 animate-ping ${
                isListening ? "opacity-75" : "opacity-0"
              }`}
            />
            <div
              className={`absolute -inset-3 rounded-full border border-emerald-500/30 ${
                isListening ? "animate-pulse" : ""
              }`}
            />
            <button
              onClick={() => setIsListening(!isListening)}
              className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 p-1 flex items-center justify-center shadow-xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-transform"
            >
              <div className="w-full h-full bg-[#0B0B0C] rounded-full flex items-center justify-center">
                <Mic
                  className={`w-8 h-8 ${
                    isListening ? "text-emerald-400 animate-bounce" : "text-zinc-500"
                  }`}
                />
              </div>
            </button>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">
              {isListening
                ? language === "hi"
                  ? "सुन रहा हूँ... बोलिए (हिंदी / मराठी)"
                  : language === "mr"
                  ? "ऐकत आहे... बोला (मराठी / हिंदी)"
                  : "Listening... Speak in Hindi, Marathi, or English"
                : spokenPrompt
                ? `"${spokenPrompt}"`
                : "Tap a quick voice command below"}
            </h4>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Works seamlessly for non-typing & smartphone-free cooperative artisans.
            </p>
          </div>

          {/* AI Response Box */}
          {aiResponse && (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-left animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2 mb-1.5">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                  Bhashini Audio Feedback
                </span>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed font-medium">{aiResponse}</p>
            </div>
          )}
        </div>

        {/* Quick Sample Voice Prompts */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block text-left">
            Try Sample Voice Commands:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sampleCommands.map((cmd, idx) => {
              const label =
                language === "hi" ? cmd.textHi : language === "mr" ? cmd.textMr : cmd.text;
              return (
                <button
                  key={idx}
                  onClick={() => handleRunCommand(cmd)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#161719] border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/5 text-left text-xs text-zinc-300 hover:text-white transition-all group"
                >
                  <span className="truncate pr-1">🗣️ {label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
