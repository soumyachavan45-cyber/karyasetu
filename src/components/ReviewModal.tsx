"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { X, Star, Sparkles, Heart, ShieldCheck, CheckCircle2, BadgeIndianRupee } from "lucide-react";
import confetti from "canvas-confetti";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  workerName: string;
  workerTrade: string;
  bookingId: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  workerName,
  workerTrade,
  bookingId,
}) => {
  const { addToast } = useApp();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>(["On-Time Arrival", "Clean Workmanship"]);
  const [feedback, setFeedback] = useState("");
  const [tipAmount, setTipAmount] = useState<number | null>(50);

  const reviewTags = [
    "On-Time Arrival",
    "Clean Workmanship",
    "Polite Behavior",
    "Fair Transparent Pricing",
    "Professional Equipment",
    "Safety Certified",
  ];

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmitReview = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {}

    addToast(
      "Review & Tip Submitted! ⭐",
      `Thank you! Rated ${rating} Stars for ${workerName}.${tipAmount ? ` ₹${tipAmount} tip credited via UPI.` : ""}`,
      "success"
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden flex flex-col p-5 sm:p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-extrabold text-slate-900">Rate Service & Support Artisan</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Worker Info */}
        <div className="text-center space-y-1">
          <h4 className="text-base font-extrabold text-slate-900">{workerName}</h4>
          <p className="text-xs text-blue-700 font-semibold">{workerTrade}</p>
          <span className="text-[10px] font-mono text-slate-500 font-medium">Booking Reference: #{bookingId}</span>
        </div>

        {/* Interactive Star Rating */}
        <div className="flex items-center justify-center gap-2 py-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              className="p-1 transition-transform hover:scale-125 focus:outline-none"
            >
              <Star
                className={`w-7 h-7 transition-colors ${
                  (hoverRating || rating) >= star
                    ? "text-amber-400 fill-amber-400 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                    : "text-slate-300"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Quick Review Tags */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-700">
            What went exceptionally well?
          </label>
          <div className="flex flex-wrap gap-1.5">
            {reviewTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-semibold transition-all border ${
                    isSelected
                      ? "bg-blue-50 text-blue-700 border-blue-300 shadow-2xs"
                      : "bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Written Review */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Additional Comments (Optional)
          </label>
          <textarea
            rows={2}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your experience to help the cooperative guild..."
            className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-medium"
          />
        </div>

        {/* Optional Direct Artisan Tip (100% to Worker UPI) */}
        <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-950 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              Add Direct Artisan Tip (100% to UPI)
            </span>
            <span className="text-[10px] font-mono text-emerald-800 font-bold">0% Platform Fee</span>
          </div>

          <div className="flex items-center gap-2">
            {[30, 50, 100, 200].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setTipAmount(tipAmount === amt ? null : amt)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                  tipAmount === amt
                    ? "btn-glossy-green text-white border-transparent shadow-xs"
                    : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300"
                }`}
              >
                ₹{amt}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmitReview}
          className="w-full py-3 rounded-2xl text-xs font-extrabold btn-glossy-blue text-white shadow-md active:scale-95 flex items-center justify-center gap-1.5"
        >
          <CheckCircle2 className="w-4 h-4 stroke-[3]" />
          <span>Submit Review & Rating</span>
        </button>
      </div>
    </div>
  );
};

