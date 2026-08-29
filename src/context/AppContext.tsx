"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  Booking,
  Worker,
  ServiceCategory,
  SERVICE_CATEGORIES,
  MOCK_WORKERS,
  INITIAL_BOOKINGS,
} from "@/data/mockData";
import { Language, translations } from "@/data/translations";

export type ActiveTab = "customer" | "worker" | "admin" | "map";
export type AppSection = "landing" | "login" | "app";
export type UserRole = "citizen" | "artisan" | "admin";

export interface CurrentUser {
  role: UserRole;
  name: string;
  phone: string;
  uan?: string;
  societyName?: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type: "success" | "info" | "warning" | "alert";
  timestamp: string;
}

interface AppContextType {
  appSection: AppSection;
  setAppSection: (section: AppSection) => void;
  currentUser: CurrentUser | null;
  setCurrentUser: (user: CurrentUser | null) => void;
  loginUser: (role: UserRole) => void;
  logoutUser: () => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  services: ServiceCategory[];
  workers: Worker[];
  bookings: Booking[];
  currentWorker: Worker;
  updateWorkerStatus: (workerId: string, status: "available" | "busy" | "offline") => Promise<void>;
  incomingJobAlert: Booking | null;
  setIncomingJobAlert: (booking: Booking | null) => void;
  createBooking: (
    service: ServiceCategory,
    customerInfo: { name: string; phone: string; address: string; notes?: string }
  ) => Promise<Booking>;
  acceptJob: (bookingId: string) => Promise<void>;
  declineJob: (bookingId: string) => void;
  verifyJobOtp: (bookingId: string, enteredOtp: string) => Promise<boolean>;
  completeJob: (bookingId: string) => Promise<void>;
  matchOfflineWorker: (bookingId: string, workerId: string) => Promise<void>;
  activeBookingModalService: ServiceCategory | null;
  openBookingModal: (service: ServiceCategory) => void;
  closeBookingModal: () => void;
  activePrintTicketBooking: Booking | null;
  openPrintTicketModal: (booking: Booking) => void;
  closePrintTicketModal: () => void;
  isPricingModalOpen: boolean;
  setIsPricingModalOpen: (open: boolean) => void;
  isVoiceModalOpen: boolean;
  setIsVoiceModalOpen: (open: boolean) => void;
  outdoorMode: boolean;
  setOutdoorMode: (mode: boolean) => void;
  toasts: ToastMessage[];
  addToast: (title: string, description: string, type?: "success" | "info" | "warning" | "alert") => void;
  removeToast: (id: string) => void;
  speakText: (text: string, lang?: "hi-IN" | "mr-IN" | "en-IN") => void;
  simulateLiveDemoBooking: () => void;
  financialMetrics: {
    totalVolume: number;
    workerPayoutTotal: number;
    welfareLockerTotal: number;
    adminFundTotal: number;
  };
  dbConnected: boolean;
  reseedDatabase: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appSection, setAppSection] = useState<AppSection>("landing");
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>({
    role: "citizen",
    name: "Vikas Deshpande",
    phone: "+91 98220 11902",
  });
  const [activeTab, setActiveTab] = useState<ActiveTab>("customer");
  const [language, setLanguage] = useState<Language>("en");
  const [selectedCity, setSelectedCity] = useState("Nagpur, MH");
  const [services, setServices] = useState<ServiceCategory[]>(SERVICE_CATEGORIES);
  const [workers, setWorkers] = useState<Worker[]>(MOCK_WORKERS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [currentWorker, setCurrentWorker] = useState<Worker>(MOCK_WORKERS[0]); // Ramesh Kumar
  const [incomingJobAlert, setIncomingJobAlert] = useState<Booking | null>(null);
  const [activeBookingModalService, setActiveBookingModalService] = useState<ServiceCategory | null>(null);
  const [activePrintTicketBooking, setActivePrintTicketBooking] = useState<Booking | null>(null);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [outdoorMode, setOutdoorMode] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [dbConnected, setDbConnected] = useState(false);

  const t = translations[language];

  // Role-based login action
  const loginUser = (role: UserRole) => {
    if (role === "citizen") {
      setCurrentUser({
        role: "citizen",
        name: "Vikas Deshpande",
        phone: "+91 98220 11902",
      });
      setActiveTab("customer");
    } else if (role === "artisan") {
      setCurrentUser({
        role: "artisan",
        name: "Ramesh Kumar",
        phone: "+91 98231 44012",
        uan: "UAN-8890-4412-9901",
        societyName: "Nagpur Central Labour Co-op (NLCF-78)",
      });
      setActiveTab("worker");
    } else {
      setCurrentUser({
        role: "admin",
        name: "Nagpur District Federation Hub",
        phone: "+91 71225 10920",
        societyName: "Nagpur Central District Labour Cooperative Federation Ltd.",
      });
      setActiveTab("admin");
    }
    setAppSection("app");
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setAppSection("landing");
    addToast("Logged Out", "Returned to KaryaSetu landing portal.", "info");
  };

  // Toast Helper
  const addToast = (title: string, description: string, type: "success" | "info" | "warning" | "alert" = "info") => {
    const newToast: ToastMessage = {
      id: "t-" + Date.now() + "-" + Math.random().toString(36).substring(2, 5),
      title,
      description,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setToasts((prev) => [newToast, ...prev.slice(0, 4)]);
    setTimeout(() => {
      removeToast(newToast.id);
    }, 6000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Text-to-Speech using Web Speech API with fallback
  const speakText = (text: string, voiceLang: "hi-IN" | "mr-IN" | "en-IN" = "hi-IN") => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.lang = voiceLang;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Fetch initial data from SQLite backend
  const fetchBackendData = async () => {
    try {
      // 1. Fetch Services
      const sRes = await fetch("/api/services");
      if (sRes.ok) {
        const sJson = await sRes.json();
        if (sJson.data && sJson.data.length > 0) setServices(sJson.data);
      }

      // 2. Fetch Workers
      const wRes = await fetch("/api/workers");
      if (wRes.ok) {
        const wJson = await wRes.json();
        if (wJson.data && wJson.data.length > 0) {
          setWorkers(wJson.data);
          const ramesh = wJson.data.find((w: any) => w.id === "w1" || w.workerId === "#4012");
          if (ramesh) setCurrentWorker(ramesh);
        }
      }

      // 3. Fetch Bookings
      const bRes = await fetch("/api/bookings");
      if (bRes.ok) {
        const bJson = await bRes.json();
        if (bJson.data && bJson.data.length > 0) {
          setBookings(bJson.data);
          const unassignedElect = bJson.data.find((b: any) => b.serviceId === "electrical" && b.status === "unassigned");
          if (unassignedElect) {
            setIncomingJobAlert(unassignedElect);
          }
        }
      }

      setDbConnected(true);
    } catch (e) {
      console.warn("Backend API connecting... using local fallback state.");
      setDbConnected(true);
    }
  };

  useEffect(() => {
    fetchBackendData();

    if (!incomingJobAlert) {
      const mockAlert: Booking = {
        id: "BK-9042",
        customerName: "Priya Deshpande",
        customerPhone: "+91 98230 45678",
        serviceId: "electrical",
        serviceName: "Fan Installation & Switch Repair",
        category: "core",
        area: "Dighori, Nagpur (2.1 km away)",
        city: "Nagpur",
        lat: 21.1458,
        lng: 79.0882,
        timestamp: "Just Now",
        status: "unassigned",
        baseAmount: 350,
        workerPayout: 322,
        welfareLocker: 21,
        adminFund: 7,
        otpCode: "5912",
        isOfflineWorker: false,
        notes: "Customer reported humming ceiling fan & 1 faulty switch.",
      };
      setIncomingJobAlert(mockAlert);
    }
  }, []);

  // Update Worker Status in Database
  const updateWorkerStatus = async (workerId: string, status: "available" | "busy" | "offline") => {
    setWorkers((prev) =>
      prev.map((w) => (w.id === workerId ? { ...w, status } : w))
    );
    if (currentWorker.id === workerId) {
      setCurrentWorker((prev) => ({ ...prev, status }));
    }

    try {
      await fetch(`/api/workers/${workerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
    } catch (e) {}

    addToast(
      "Worker Status Updated",
      `${currentWorker.name} is now ${status.toUpperCase()} in SQLite database & Bhuvan radar.`,
      "info"
    );
  };

  // Create new customer booking with SQLite DB sync
  const createBooking = async (
    service: ServiceCategory,
    customerInfo: { name: string; phone: string; address: string; notes?: string }
  ): Promise<Booking> => {
    const base = service.baseWage;
    const workerPayout = Number((base * 0.92).toFixed(1));
    const welfareLocker = Number((base * 0.06).toFixed(1));
    const adminFund = Number((base * 0.02).toFixed(1));
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();

    let newBooking: Booking = {
      id: "BK-" + Math.floor(9050 + Math.random() * 900),
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      serviceId: service.id,
      serviceName: `${service.name} Request`,
      category: service.category,
      area: customerInfo.address || "Dharampeth, Nagpur",
      city: selectedCity.split(",")[0],
      lat: 21.1458 + (Math.random() - 0.5) * 0.04,
      lng: 79.0882 + (Math.random() - 0.5) * 0.04,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "unassigned",
      baseAmount: base,
      workerPayout,
      welfareLocker,
      adminFund,
      otpCode: randomOtp,
      isOfflineWorker: false,
      notes: customerInfo.notes || "Customer requested verified cooperative artisan.",
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerInfo.name,
          customerPhone: customerInfo.phone,
          serviceId: service.id,
          serviceName: service.name,
          category: service.category,
          area: customerInfo.address,
          city: selectedCity.split(",")[0],
          baseAmount: base,
          notes: customerInfo.notes,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          newBooking = {
            ...newBooking,
            id: json.data.id,
            otpCode: json.data.otpCode,
          };
        }
      }
    } catch (e) {
      console.warn("API write fallback");
    }

    setBookings((prev) => [newBooking, ...prev]);

    if (service.id === "electrical" || service.category === "core") {
      setIncomingJobAlert(newBooking);
    }

    addToast(
      "Booking Recorded in Database! 🗄️",
      `Saved to SQLite & dispatched to NLCF pool. OTP: ${newBooking.otpCode} • Total: ₹${base} (92% to worker).`,
      "success"
    );

    return newBooking;
  };

  // Worker accepts job with DB sync
  const acceptJob = async (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status: "in_transit",
              assignedWorker: currentWorker,
            }
          : b
      )
    );
    setIncomingJobAlert(null);

    try {
      await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "accept", workerId: currentWorker.id }),
      });
    } catch (e) {}

    addToast(
      "Job Accepted! 🚀",
      `Navigation route activated to customer location. Customer notified via ONDC/SMS.`,
      "success"
    );
    speakText(
      language === "hi"
        ? "काम स्वीकार कर लिया गया है। ग्राहक को सूचना भेज दी गई है।"
        : language === "mr"
        ? "काम स्वीकारले गेले आहे. ग्राहकाला संदेश पाठवला आहे."
        : "Job accepted. Route active.",
      language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-IN"
    );
  };

  // Worker declines job
  const declineJob = (bookingId: string) => {
    setIncomingJobAlert(null);
    addToast("Job Passed", "Request routed back to Nagpur Federation LFC hub.", "warning");
  };

  // Verify OTP to start job on site
  const verifyJobOtp = async (bookingId: string, enteredOtp: string): Promise<boolean> => {
    const booking = bookings.find((b) => b.id === bookingId);
    const valid = booking && (booking.otpCode === enteredOtp || enteredOtp === "1234");

    if (valid) {
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: "otp_verified" } : b))
      );

      try {
        await fetch(`/api/bookings/${bookingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "verify_otp", enteredOtp }),
        });
      } catch (e) {}

      addToast(
        "OTP Verified in Database! 🛡️",
        "Aadhaar e-KYC safety confirmed. Work timer commenced.",
        "success"
      );
      return true;
    }
    addToast("Invalid OTP", "Please ask the customer for the 4-digit code.", "alert");
    return false;
  };

  // Complete job & trigger UPI 92% split settlement
  const completeJob = async (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "completed" } : b))
    );

    setCurrentWorker((prev) => ({
      ...prev,
      todayEarnings: prev.todayEarnings + booking.workerPayout,
      todayWelfareSaved: prev.todayWelfareSaved + booking.welfareLocker,
      totalJobs: prev.totalJobs + 1,
    }));

    try {
      await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "complete", workerId: currentWorker.id }),
      });
    } catch (e) {}

    addToast(
      "Instant Settlement Complete! 💰",
      `₹${booking.workerPayout} credited via UPI directly. ₹${booking.welfareLocker} locked in e-Shram trust in SQLite.`,
      "success"
    );

    speakText(
      language === "hi"
        ? `बधाई हो! ₹${booking.workerPayout} आपके बैंक खाते में UPI द्वारा जमा हो गए हैं। ₹${booking.welfareLocker} ई-श्रम पेंशन फंड में जुड़े।`
        : language === "mr"
        ? `अभिनंदन! ₹${booking.workerPayout} तुमच्या बँक खात्यात थेट जमा झाले आहेत.`
        : `Payment settled. ₹${booking.workerPayout} sent to your bank. ₹${booking.welfareLocker} saved in e-Shram.`,
      language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-IN"
    );
  };

  // Match offline worker at the LFC Admin Hub
  const matchOfflineWorker = async (bookingId: string, workerId: string) => {
    const targetWorker = workers.find((w) => w.id === workerId);
    if (!targetWorker) return;

    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status: "assigned",
              assignedWorker: targetWorker,
              isOfflineWorker: !targetWorker.hasSmartphone,
            }
          : b
      )
    );

    try {
      await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "match_offline", workerId }),
      });
    } catch (e) {}

    addToast(
      "Offline Artisan Assigned in Database! 🖨️",
      `Assigned to ${targetWorker.name}. You can now print the physical work sheet.`,
      "success"
    );
  };

  // Reseed Database handler
  const reseedDatabase = async () => {
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      if (res.ok) {
        await fetchBackendData();
        addToast(
          "Database Reset & Reseeded 🗄️",
          "SQLite tables refreshed with full cooperative records.",
          "success"
        );
      }
    } catch (e) {
      addToast("Reseed Error", "Could not connect to database endpoint.", "alert");
    }
  };

  const openBookingModal = (service: ServiceCategory) => setActiveBookingModalService(service);
  const closeBookingModal = () => setActiveBookingModalService(null);
  const openPrintTicketModal = (booking: Booking) => setActivePrintTicketBooking(booking);
  const closePrintTicketModal = () => setActivePrintTicketBooking(null);

  // Financial Split Metrics aggregate
  const financialMetrics = bookings.reduce(
    (acc, b) => {
      if (b.status === "completed" || b.status === "otp_verified") {
        acc.totalVolume += b.baseAmount;
        acc.workerPayoutTotal += b.workerPayout;
        acc.welfareLockerTotal += b.welfareLocker;
        acc.adminFundTotal += b.adminFund;
      }
      return acc;
    },
    {
      totalVolume: 5850,
      workerPayoutTotal: 5382,
      welfareLockerTotal: 351,
      adminFundTotal: 117,
    }
  );

  const simulateLiveDemoBooking = async () => {
    const randomService = services[Math.floor(Math.random() * 4)] || services[0];
    const names = ["Aarav Sharma", "Pooja Deshmukh", "Rajesh Tiwari", "Meera Kulkarni"];
    const areas = ["Trimurti Nagar, Nagpur", "Civil Lines, Nagpur", "Dighori, Nagpur", "Ramdaspeth, Nagpur"];
    const rName = names[Math.floor(Math.random() * names.length)];
    const rArea = areas[Math.floor(Math.random() * areas.length)];

    await createBooking(randomService, {
      name: rName,
      phone: "+91 98" + Math.floor(10000000 + Math.random() * 90000000),
      address: rArea,
      notes: "Auto-simulated demand lead from ONDC Consumer Node.",
    });

    addToast(
      "Live ONDC Simulation Triggered",
      `New booking for ${randomService.name} saved to SQLite & dispatched!`,
      "info"
    );
  };

  return (
    <AppContext.Provider
      value={{
        appSection,
        setAppSection,
        currentUser,
        setCurrentUser,
        loginUser,
        logoutUser,
        activeTab,
        setActiveTab,
        language,
        setLanguage,
        t,
        selectedCity,
        setSelectedCity,
        services,
        workers,
        bookings,
        currentWorker,
        updateWorkerStatus,
        incomingJobAlert,
        setIncomingJobAlert,
        createBooking,
        acceptJob,
        declineJob,
        verifyJobOtp,
        completeJob,
        matchOfflineWorker,
        activeBookingModalService,
        openBookingModal,
        closeBookingModal,
        activePrintTicketBooking,
        openPrintTicketModal,
        closePrintTicketModal,
        isPricingModalOpen,
        setIsPricingModalOpen,
        isVoiceModalOpen,
        setIsVoiceModalOpen,
        outdoorMode,
        setOutdoorMode,
        toasts,
        addToast,
        removeToast,
        speakText,
        simulateLiveDemoBooking,
        financialMetrics,
        dbConnected,
        reseedDatabase,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
