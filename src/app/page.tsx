"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { LandingPage } from "@/components/LandingPage";
import { LoginPage } from "@/components/LoginPage";
import { ConsumerView } from "@/components/ConsumerView";
import { WorkerMobileView } from "@/components/WorkerMobileView";
import { LiveMapView } from "@/components/LiveMapView";
import { AccountView } from "@/components/AccountView";

export default function HomePage() {
  const { appSection, setAppSection, activeTab, loginUser } = useApp();

  if (appSection === "landing") {
    return (
      <LandingPage
        onGetStarted={() => {
          loginUser("citizen");
        }}
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
      {activeTab === "map" && <LiveMapView />}
      {activeTab === "account" && <AccountView />}
    </div>
  );
}

