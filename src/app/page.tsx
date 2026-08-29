"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { LandingPage } from "@/components/LandingPage";
import { LoginPage } from "@/components/LoginPage";
import { ConsumerView } from "@/components/ConsumerView";
import { WorkerMobileView } from "@/components/WorkerMobileView";
import { AdminHubView } from "@/components/AdminHubView";
import { LiveMapView } from "@/components/LiveMapView";

export default function HomePage() {
  const { appSection, setAppSection, activeTab, loginUser } = useApp();

  if (appSection === "landing") {
    return (
      <LandingPage
        onGetStarted={() => setAppSection("app")}
        onLogin={() => setAppSection("login")}
      />
    );
  }

  if (appSection === "login") {
    return (
      <LoginPage
        onSuccess={(role) => loginUser(role)}
        onBackToLanding={() => setAppSection("landing")}
      />
    );
  }

  return (
    <div className="w-full">
      {activeTab === "customer" && <ConsumerView />}
      {activeTab === "worker" && <WorkerMobileView />}
      {activeTab === "admin" && <AdminHubView />}
      {activeTab === "map" && <LiveMapView />}
    </div>
  );
}
