/**
 * Firebase Cloud Messaging (FCM) Notification Engine & Push Alert Simulator
 */

export interface FCMNotification {
  id: string;
  title: string;
  body: string;
  type: "job_alert" | "booking_update" | "payment" | "emergency" | "chat";
  timestamp: string;
  actionUrl?: string;
  data?: any;
}

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (typeof window !== "undefined" && "Notification" in window) {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }
  return false;
};

export const sendFCMNotification = (
  title: string,
  body: string,
  type: "job_alert" | "booking_update" | "payment" | "emergency" | "chat" = "booking_update"
): FCMNotification => {
  const notification: FCMNotification = {
    id: "fcm_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
    title,
    body,
    type,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };

  // Trigger browser native notification if permitted
  if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
    try {
      new Notification(title, {
        body,
        icon: "/favicon.ico",
        badge: "/favicon.ico",
      });
    } catch (e) {
      // safe fallback
    }
  }

  // Play subtle audio chime for job alert or emergency
  if (typeof window !== "undefined") {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(type === "emergency" ? 880 : 587.33, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      // AudioContext fallback
    }
  }

  return notification;
};
