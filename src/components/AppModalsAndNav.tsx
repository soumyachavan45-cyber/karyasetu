"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { ToastContainer } from "@/components/ToastContainer";
import { JobBookingModal } from "@/components/JobBookingModal";
import { PhysicalJobTicketModal } from "@/components/PhysicalJobTicketModal";
import { VoiceAssistantModal } from "@/components/VoiceAssistantModal";
import { PricingMatrixModal } from "@/components/PricingMatrixModal";
import { InvoiceModal } from "@/components/InvoiceModal";
import { ChatModal } from "@/components/ChatModal";
import { ReviewModal } from "@/components/ReviewModal";
import { CustomerCareModal } from "@/components/CustomerCareModal";

export const AppModalsAndNav: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    currentInvoice,
    setCurrentInvoice,
    setIsInvoiceOpen,
    isInvoiceOpen,
    isChatOpen,
    setIsChatOpen,
    isReviewOpen,
    setIsReviewOpen,
    isCustomerCareOpen,
    setIsCustomerCareOpen,
    activeTrackingBooking,
    currentWorker,
  } = useApp();

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] pb-16 md:pb-0">{children}</main>
      <BottomNav />
      <ToastContainer />
      <JobBookingModal />
      <PhysicalJobTicketModal />
      <VoiceAssistantModal />
      <PricingMatrixModal />

      {/* Razorpay Tax Invoice Modal */}
      <InvoiceModal
        invoice={currentInvoice}
        onClose={() => setCurrentInvoice(null)}
      />

      {/* Direct In-App Chat Modal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        workerName={activeTrackingBooking?.assignedWorker?.name || currentWorker.name}
        workerPhone={activeTrackingBooking?.assignedWorker?.phone || currentWorker.phone}
        workerTrade={activeTrackingBooking?.serviceName || currentWorker.trade}
      />

      {/* Post-Service Review & Tip Modal */}
      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        workerName={activeTrackingBooking?.assignedWorker?.name || currentWorker.name}
        workerTrade={activeTrackingBooking?.serviceName || currentWorker.trade}
        bookingId={activeTrackingBooking?.id || "BK-9042"}
      />

      {/* 24/7 Helpdesk & Grievance Modal */}
      <CustomerCareModal
        isOpen={isCustomerCareOpen}
        onClose={() => setIsCustomerCareOpen(false)}
      />
    </>
  );
};
