"use client";

import React, { useEffect, useState, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { Worker } from "@/data/mockData";
import {
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  Zap,
  Clock,
  Layers,
  Sparkles,
  User,
  ArrowRight,
  MessageSquare,
  BadgeIndianRupee,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export const LiveMapView: React.FC = () => {
  const {
    workers,
    bookings,
    selectedCity,
    currentWorker,
    activeTrackingBooking,
    openBookingModal,
    services,
    setIsChatOpen,
  } = useApp();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [etaMinutes, setEtaMinutes] = useState(12);
  const [distanceKm, setDistanceKm] = useState(2.1);
  const [sortedWorkers, setSortedWorkers] = useState<Worker[]>([]);

  // Calculate sorted workers based on proximity
  useEffect(() => {
    const sorted = [...workers].sort((a, b) => {
      // Prioritize available workers
      if (a.status === "available" && b.status !== "available") return -1;
      if (b.status === "available" && a.status !== "available") return 1;
      return b.rating - a.rating;
    });
    setSortedWorkers(sorted);
  }, [workers]);

  // ETA countdown simulator for active tracking
  useEffect(() => {
    if (activeTrackingBooking) {
      const interval = setInterval(() => {
        setEtaMinutes((prev) => (prev > 1 ? prev - 1 : 1));
        setDistanceKm((prev) => (prev > 0.2 ? Number((prev - 0.2).toFixed(1)) : 0.2));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeTrackingBooking]);

  // Initialize Leaflet Map on Client Side
  useEffect(() => {
    let isMounted = true;

    const initLeafletMap = async () => {
      if (typeof window === "undefined" || !mapContainerRef.current) return;

      const L = (await import("leaflet")).default;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      const defaultCenter: [number, number] = [21.1458, 79.0882]; // Nagpur center

      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: 13,
        zoomControl: false,
      });

      // Light mode tile layer (CartoDB Voyager)
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a> | ISRO Bhuvan Radar',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      // Consumer Destination Pin (if active tracking)
      const consumerLat = 21.1558;
      const consumerLng = 79.0982;

      const consumerIcon = L.divIcon({
        className: "custom-consumer-icon",
        html: `
          <div class="relative flex items-center justify-center">
            <div class="w-8 h-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white shadow-lg animate-pulse">
              <span class="text-xs">📍</span>
            </div>
            <div class="absolute -bottom-5 whitespace-nowrap bg-blue-900 text-white font-sans font-bold text-[9px] px-1.5 py-0.5 rounded shadow-sm">
              Your Destination
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      L.marker([consumerLat, consumerLng], { icon: consumerIcon }).addTo(map);

      // Worker markers
      workers.forEach((w) => {
        const isAvailable = w.status === "available";
        const isBusy = w.status === "busy";
        const pinColor = isAvailable ? "#16A34A" : isBusy ? "#E67E22" : "#94A3B8";

        const workerIcon = L.divIcon({
          className: "custom-worker-icon",
          html: `
            <div class="relative group cursor-pointer">
              <div style="background-color: ${pinColor}; box-shadow: 0 0 12px ${pinColor};" 
                   class="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xs transform transition-transform hover:scale-125">
                ⚡
              </div>
              <div class="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-900 text-white font-sans text-[10px] px-2 py-0.5 rounded shadow-md whitespace-nowrap z-50">
                ${w.name} (${w.trade})
              </div>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const marker = L.marker([w.currentLocation.lat, w.currentLocation.lng], {
          icon: workerIcon,
        }).addTo(map);

        marker.on("click", () => {
          setSelectedWorker(w);
        });
      });

      // If active tracking booking, draw animated route polyline
      if (activeTrackingBooking) {
        const workerCoord: [number, number] = [21.1458, 79.0882];
        const destCoord: [number, number] = [consumerLat, consumerLng];

        const polyline = L.polyline([workerCoord, destCoord], {
          color: "#2563EB",
          weight: 4,
          opacity: 0.8,
          dashArray: "8, 8",
        }).addTo(map);

        map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
      }

      mapInstanceRef.current = map;
    };

    initLeafletMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [workers, activeTrackingBooking]);

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-[#E2EEFC] overflow-hidden flex flex-col md:flex-row font-sans">
      {/* 1. Left Sidebar: Active Tracking Status & Nearby Sorted Workers */}
      <div className="w-full md:w-96 bg-white/95 backdrop-blur-xl border-r border-slate-200/90 flex flex-col z-10 overflow-y-auto max-h-[45vh] md:max-h-full shadow-lg">
        {/* Active En-Route Tracking Card (If Booking is in Transit) */}
        {activeTrackingBooking && (
          <div className="p-4 bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-b border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                LIVE GPS EN-ROUTE
              </span>
              <span className="text-xs font-mono text-slate-600 font-bold">
                OTP: <strong className="text-blue-600">{activeTrackingBooking.otpCode}</strong>
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  {activeTrackingBooking.serviceName}
                </h3>
                <p className="text-xs text-slate-600">
                  Artisan:{" "}
                  <strong className="text-emerald-700">
                    {activeTrackingBooking.assignedWorker?.name || "Ramesh Kumar"}
                  </strong>
                </p>
              </div>

              <div className="text-right">
                <span className="text-xl font-black font-mono text-emerald-700">
                  {etaMinutes} min
                </span>
                <p className="text-[10px] text-slate-500 font-mono font-semibold">{distanceKm} km away</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setIsChatOpen(true)}
                className="py-2 px-3 rounded-xl btn-glossy-green text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat / Message</span>
              </button>

              <a
                href={`tel:${activeTrackingBooking.assignedWorker?.phone || "+919823144012"}`}
                className="py-2 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Direct Call</span>
              </a>
            </div>
          </div>
        )}

        {/* Proximity Sorted Worker List Header */}
        <div className="px-4 py-3 border-b border-slate-200/80 bg-slate-50/80 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              Active Nearby Guild Artisans
            </h4>
            <p className="text-[10px] text-slate-500 font-medium">
              Sorted by GPS Proximity to {selectedCity}
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            {workers.filter((w) => w.status === "available").length} Active
          </span>
        </div>

        {/* Worker Cards Stream */}
        <div className="flex-1 divide-y divide-slate-100 overflow-y-auto">
          {sortedWorkers.map((w, index) => {
            const isSelected = selectedWorker?.id === w.id;
            return (
              <div
                key={w.id}
                onClick={() => setSelectedWorker(w)}
                className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-all space-y-2 ${
                  isSelected ? "bg-blue-50/80 border-l-4 border-blue-600" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center font-bold text-blue-700 text-xs shadow-2xs">
                      {w.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                        <span>{w.name}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      </h5>
                      <p className="text-[11px] text-slate-600 font-medium">{w.trade}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                        w.status === "available"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {w.status}
                    </span>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5 font-semibold">
                      {(0.8 + index * 0.5).toFixed(1)} km away
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                  <span>⭐ {w.rating} ({w.totalJobs} jobs)</span>
                  <span className="truncate max-w-[140px] text-slate-600">{w.societyName}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Right Area: Live Leaflet Interactive Map View */}
      <div className="flex-1 relative h-full">
        {/* Map Container */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Map Overlays */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <div className="px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-xs shadow-md flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-slate-800 font-semibold text-[11px]">
              ISRO Bhuvan Radar: <strong className="text-blue-600 font-bold">{selectedCity}</strong>
            </span>
          </div>
        </div>

        {/* Selected Worker Floating Drawer (On Map) */}
        {selectedWorker && (
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 glass-panel bg-white/95 backdrop-blur-xl border border-white/90 rounded-3xl p-4 shadow-2xl z-20 space-y-3 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span>{selectedWorker.name}</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </h4>
                <p className="text-xs text-blue-700 font-semibold">
                  {selectedWorker.trade} • {selectedWorker.societyTier}
                </p>
                <p className="text-[10px] font-mono text-slate-500">
                  {selectedWorker.eShramCardNo}
                </p>
              </div>

              <button
                onClick={() => setSelectedWorker(null)}
                className="text-slate-400 hover:text-slate-800 text-xs p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Rating</span>
                <strong className="text-amber-600 font-mono font-bold">⭐ {selectedWorker.rating} / 5.0</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Completed Jobs</span>
                <strong className="text-slate-900 font-mono font-bold">{selectedWorker.totalJobs} Works</strong>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const s = services[0];
                  openBookingModal(s);
                }}
                className="flex-1 py-2 px-3 rounded-xl btn-glossy-blue text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Dispatch</span>
              </button>

              <a
                href={`tel:${selectedWorker.phone}`}
                className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-emerald-600 shadow-2xs"
                title={`Call ${selectedWorker.phone}`}
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

