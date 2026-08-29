"use client";

import React, { useEffect, useState, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { Worker, ServiceCategory } from "@/data/mockData";
import {
  MapPin,
  Navigation,
  ShieldCheck,
  Star,
  Zap,
  Phone,
  CheckCircle2,
  Clock,
  Filter,
  Truck,
  Layers,
  Sparkles,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export const LiveMapView: React.FC = () => {
  const { workers, services, openBookingModal, selectedCity, language } = useApp();

  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(workers[0]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [mapZoom, setMapZoom] = useState(13);
  const [deliveryProgress, setDeliveryProgress] = useState(35);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Filtered workers
  const filteredWorkers = workers.filter((w) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "available") return w.status === "available";
    if (activeFilter === "busy") return w.status === "busy";
    if (activeFilter === "trades") return w.trade.toLowerCase().includes("electric") || w.trade.toLowerCase().includes("plumb") || w.trade.toLowerCase().includes("carpent");
    if (activeFilter === "commerce") return w.trade.toLowerCase().includes("farm") || w.trade.toLowerCase().includes("shg");
    return true;
  });

  // Simulated moving delivery truck
  useEffect(() => {
    const interval = setInterval(() => {
      setDeliveryProgress((prev) => (prev >= 95 ? 10 : prev + 2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Initialize Leaflet map dynamically
  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    // Load Leaflet CSS and JS dynamically if not already loaded
    const initLeaflet = async () => {
      const L = (await import("leaflet")).default;

      // Center around Nagpur coordinates
      const centerLat = 21.1458;
      const centerLng = 79.0882;

      if (!leafletMapRef.current && mapContainerRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [centerLat, centerLng],
          zoom: 13,
          zoomControl: false,
        });

        // Add Dark Theme CartoDB Tiles (matches #0B0B0C Cyberpunk Dark theme)
        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
          {
            attribution: '&copy; <a href="https://bhuvan.nrsc.gov.in/">ISRO Bhuvan / NLCF</a> &copy; OpenStreetMap',
            maxZoom: 19,
            subdomains: "abcd",
          }
        ).addTo(map);

        L.control.zoom({ position: "bottomright" }).addTo(map);

        leafletMapRef.current = map;
      }

      const map = leafletMapRef.current;
      if (!map) return;

      // Clear existing markers
      markersRef.current.forEach((m) => map.removeLayer(m));
      markersRef.current = [];

      // Add worker markers with custom glowing HTML icons
      filteredWorkers.forEach((w) => {
        const isSelected = selectedWorker?.id === w.id;
        const colorClass =
          w.status === "available"
            ? "bg-emerald-500 text-black shadow-emerald-500/50"
            : w.status === "busy"
            ? "bg-amber-500 text-black shadow-amber-500/50"
            : "bg-zinc-600 text-white";

        const iconHtml = `
          <div class="relative group cursor-pointer">
            <div class="w-9 h-9 rounded-full ${colorClass} flex items-center justify-center font-bold text-xs shadow-lg border-2 ${
          isSelected ? "border-white scale-125" : "border-black"
        } transition-transform">
              ${w.trade.includes("Electric") ? "⚡" : w.trade.includes("Plumb") ? "🚰" : w.trade.includes("Purohit") ? "🪕" : w.trade.includes("SHG") || w.trade.includes("Farm") ? "🥛" : w.trade.includes("Solar") ? "📹" : "🪵"}
            </div>
            ${
              w.status === "available"
                ? '<div class="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border border-black animate-ping"></div>'
                : ""
            }
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: "custom-leaflet-marker",
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });

        const marker = L.marker([w.currentLocation.lat, w.currentLocation.lng], {
          icon: customIcon,
        }).addTo(map);

        marker.on("click", () => {
          setSelectedWorker(w);
        });

        markersRef.current.push(marker);
      });

      // Add Moving Farm-Produce Delivery Van marker
      const truckLat = 21.1350 + (deliveryProgress / 100) * 0.025;
      const truckLng = 79.0600 + (deliveryProgress / 100) * 0.035;

      const truckHtml = `
        <div class="relative cursor-pointer">
          <div class="w-10 h-10 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold text-sm shadow-xl border-2 border-white animate-bounce">
            🚚
          </div>
          <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/90 text-[9px] font-bold text-cyan-300 whitespace-nowrap border border-cyan-500/40">
            A2 Milk Van (En-Route)
          </div>
        </div>
      `;

      const truckIcon = L.divIcon({
        html: truckHtml,
        className: "custom-truck-marker",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const truckMarker = L.marker([truckLat, truckLng], { icon: truckIcon }).addTo(map);
      markersRef.current.push(truckMarker);
    };

    initLeaflet();
  }, [filteredWorkers, selectedWorker, deliveryProgress]);

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-[#0B0B0C] overflow-hidden">
      {/* Top Filter Overlay */}
      <div className="absolute top-4 left-4 right-4 md:right-auto md:w-96 z-20 flex flex-col gap-2 pointer-events-none">
        <div className="pointer-events-auto p-3 rounded-2xl bg-[#121314]/95 backdrop-blur-xl border border-white/10 shadow-2xl space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-xs font-bold text-white tracking-wide">
                ISRO Bhuvan Hyper-Local Radar
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {filteredWorkers.length} Active Artisans
            </span>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
            {[
              { id: "all", label: "All" },
              { id: "available", label: "🟢 Available Now" },
              { id: "busy", label: "🟡 On Duty" },
              { id: "trades", label: "⚡ Trades" },
              { id: "commerce", label: "🥛 SHG / Farm" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  activeFilter === f.id
                    ? "bg-emerald-500 text-black font-semibold shadow-sm"
                    : "bg-[#161719] text-zinc-400 hover:text-white border border-white/5"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="pointer-events-auto px-3 py-1.5 rounded-xl bg-[#121314]/90 backdrop-blur-lg border border-white/5 text-[10px] text-zinc-300 flex items-center justify-between gap-2">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Available (Instant Book)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Serving Customer
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" /> Moving Produce
          </span>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="flex-1 w-full h-full relative" ref={mapContainerRef}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-0">
          <span className="text-zinc-600 font-mono text-xs">Loading Bhuvan Satellite Feed...</span>
        </div>
      </div>

      {/* Right / Bottom Selected Worker Inspector Card */}
      {selectedWorker && (
        <div className="w-full md:w-96 p-4 bg-[#121314] border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-full z-20 shadow-2xl">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedWorker.photoUrl}
                  alt={selectedWorker.name}
                  className="w-12 h-12 rounded-xl object-cover border border-emerald-500/40 shadow-md"
                />
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{selectedWorker.name}</span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      ({selectedWorker.workerId})
                    </span>
                  </h4>
                  <p className="text-xs text-emerald-400 font-medium">{selectedWorker.trade}</p>
                  <p className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-zinc-500" />
                    {selectedWorker.currentLocation.area}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold justify-end">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{selectedWorker.rating}</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">
                  {selectedWorker.totalJobs} jobs
                </span>
              </div>
            </div>

            {/* Status & Verification Badges */}
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-[#161719] border border-white/5 flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    selectedWorker.status === "available"
                      ? "bg-emerald-400 animate-pulse"
                      : "bg-amber-400"
                  }`}
                />
                <span className="capitalize text-zinc-200 font-medium">
                  {selectedWorker.status === "available" ? "🟢 Duty: Online" : "🟡 In Service"}
                </span>
              </div>

              <div className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/20 flex items-center gap-1.5 text-emerald-300 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>NCD & Aadhaar Vetted</span>
              </div>
            </div>

            {/* Primary Society Details */}
            <div className="p-3 rounded-xl bg-[#161719] border border-white/5 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Cooperative Society:</span>
                <span className="text-white font-medium text-right text-[11px] truncate max-w-[180px]">
                  {selectedWorker.societyName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">e-Shram Social ID:</span>
                <span className="text-emerald-400 font-mono text-[11px]">
                  {selectedWorker.eShramCardNo}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Direct UPI Payout Rail:</span>
                <span className="text-zinc-300 font-mono text-[11px]">{selectedWorker.upiId}</span>
              </div>
            </div>

            {/* Skills */}
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                Certified Skills:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedWorker.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md text-[10px] bg-white/5 text-zinc-300 border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-white/10 mt-4 space-y-2">
            <button
              onClick={() => {
                const targetService =
                  services.find((s) => s.name.toLowerCase().includes(selectedWorker.trade.toLowerCase().slice(0, 4))) ||
                  services[0];
                openBookingModal(targetService);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-black hover:from-emerald-400 hover:to-teal-300 transition-all shadow-lg shadow-emerald-500/25 active:scale-95"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Book {selectedWorker.name.split(" ")[0]} Directly (92% Payout)</span>
            </button>
            <p className="text-[10px] text-zinc-500 text-center">
              State-mandated fixed rates • Instant UPI split settlement
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
