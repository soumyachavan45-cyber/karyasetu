"use client";

import React, { useEffect, useState, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { Worker } from "@/data/mockData";
import { INDIA_CITIES } from "@/data/mockData";
import {
  MapPin,
  ShieldCheck,
  Star,
  Zap,
  Phone,
  CheckCircle2,
  Sparkles,
  Layers,
  Award,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export const LiveMapView: React.FC = () => {
  const { workers, services, openBookingModal, selectedCity, setSelectedCity, language } = useApp();

  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(workers[0]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Filtered workers
  const filteredWorkers = workers.filter((w) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "available") return w.status === "available";
    if (activeFilter === "busy") return w.status === "busy";
    return true;
  });

  // Initialize Leaflet map dynamically
  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    const initLeaflet = async () => {
      const L = (await import("leaflet")).default;

      if (!isMounted || !mapContainerRef.current) return;

      // Find current selected city coordinates or fallback to Center of India (Nagpur/Mumbai)
      const currentCityObj = INDIA_CITIES.find((c) => selectedCity.includes(c.name)) || INDIA_CITIES[0];
      const centerLat = currentCityObj.lat || 19.0760;
      const centerLng = currentCityObj.lng || 72.8777;

      if (!leafletMapRef.current) {
        // Destroy any leftover instance
        const container = mapContainerRef.current as any;
        if (container._leaflet_id) {
          container._leaflet_id = null;
        }

        const map = L.map(mapContainerRef.current, {
          center: [centerLat, centerLng],
          zoom: 11,
          zoomControl: true,
        });

        // CartoDB Voyager Light map tiles
        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
          subdomains: "abcd",
          maxZoom: 19,
        }).addTo(map);

        leafletMapRef.current = map;
      } else {
        leafletMapRef.current.setView([centerLat, centerLng], 11);
      }

      const map = leafletMapRef.current;

      // Clear previous markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      // Add City Hub Markers for all major Indian cities
      INDIA_CITIES.forEach((city) => {
        const cityIcon = L.divIcon({
          className: "custom-city-marker",
          html: `
            <div style="background:#2563EB; color:white; padding:4px 8px; border-radius:12px; font-size:10px; font-weight:800; border:2px solid white; box-shadow:0 4px 10px rgba(37,99,235,0.3); white-space:nowrap; display:flex; align-items:center; gap:4px;">
              <span>📍 ${city.name}</span>
              <span style="background:rgba(255,255,255,0.25); padding:1px 4px; border-radius:8px; font-size:9px;">${city.activeArtisans}</span>
            </div>
          `,
          iconSize: [80, 24],
          iconAnchor: [40, 12],
        });

        const m = L.marker([city.lat, city.lng], { icon: cityIcon })
          .addTo(map)
          .on("click", () => {
            setSelectedCity(`${city.name}, ${city.state}`);
            map.flyTo([city.lat, city.lng], 12);
          });

        markersRef.current.push(m);
      });

      // Add Worker Markers
      filteredWorkers.forEach((worker) => {
        const isSelected = selectedWorker?.id === worker.id;
        const iconColor = worker.status === "available" ? "#16A34A" : "#D97706";

        const workerIcon = L.divIcon({
          className: "custom-worker-marker",
          html: `
            <div style="position:relative; width:36px; height:36px; border-radius:50%; border:2.5px solid white; background:${iconColor}; box-shadow:0 4px 14px rgba(0,0,0,0.2); overflow:hidden; cursor:pointer; transform:${isSelected ? "scale(1.2)" : "scale(1)"}; transition:transform 0.2s;">
              <img src="${worker.photoUrl}" style="width:100%; height:100%; object-fit:cover;" />
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });

        const marker = L.marker([worker.currentLocation.lat, worker.currentLocation.lng], { icon: workerIcon })
          .addTo(map)
          .on("click", () => {
            setSelectedWorker(worker);
            map.panTo([worker.currentLocation.lat, worker.currentLocation.lng]);
          });

        markersRef.current.push(marker);
      });
    };

    initLeaflet();

    return () => {
      isMounted = false;
    };
  }, [selectedCity, filteredWorkers, selectedWorker]);

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-slate-100 overflow-hidden font-sans">
      {/* Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Floating Filter Bar */}
      <div className="absolute top-4 left-4 right-4 sm:left-6 sm:right-auto z-10 flex flex-wrap items-center gap-2">
        <div className="glass-panel px-3.5 py-2 rounded-2xl border border-white/90 shadow-glass flex items-center gap-2 text-xs font-bold text-slate-800">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>India-Wide Artisan Presence</span>
          <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full font-mono font-bold">
            {INDIA_CITIES.length} Cities Active
          </span>
        </div>

        <div className="glass-panel p-1 rounded-2xl border border-white/90 shadow-glass flex items-center gap-1 text-xs">
          {[
            { id: "all", label: "All Active" },
            { id: "available", label: "Ready to Dispatch 🟢" },
            { id: "busy", label: "On Job 🟠" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs ${
                activeFilter === f.id
                  ? "btn-glossy-blue text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Floating Worker Profile Card */}
      {selectedWorker && (
        <div className="absolute bottom-6 left-4 right-4 sm:left-6 sm:max-w-md z-10 animate-in slide-in-from-bottom-5 duration-300">
          <div className="glass-panel p-5 rounded-3xl border border-white/95 shadow-2xl bg-white/95 backdrop-blur-xl space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedWorker.photoUrl}
                  alt={selectedWorker.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      {selectedWorker.name}
                    </h3>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                      ★ {selectedWorker.rating}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    {selectedWorker.trade} • {selectedWorker.experienceYears || 8} Years Exp
                  </p>
                  <p className="text-[11px] text-blue-600 font-semibold flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{selectedWorker.currentLocation.area}</span>
                  </p>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                  selectedWorker.status === "available"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {selectedWorker.status}
              </span>
            </div>

            {/* Verification Credentials */}
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{selectedWorker.eShramCardNo || "UAN-8890-5012-9901"}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">{selectedWorker.societyName}</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const s = services.find((srv) => srv.name.toLowerCase().includes(selectedWorker.trade.toLowerCase())) || services[0];
                  openBookingModal(s);
                }}
                className="flex-1 py-2.5 rounded-xl font-bold text-xs btn-glossy-blue text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Book Direct with {selectedWorker.name.split(" ")[0]}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

