import { NextResponse } from "next/server";
import { initDatabase, seedInitialData, query } from "@/lib/db";

export async function POST() {
  try {
    await initDatabase();
    await seedInitialData();

    const servicesCount = await query("SELECT COUNT(*) as c FROM services");
    const workersCount = await query("SELECT COUNT(*) as c FROM workers");
    const bookingsCount = await query("SELECT COUNT(*) as c FROM bookings");

    return NextResponse.json({
      success: true,
      message: "SQLite database re-seeded successfully with rich Indian cooperative dataset.",
      counts: {
        services: (servicesCount[0] as any).c,
        workers: (workersCount[0] as any).c,
        bookings: (bookingsCount[0] as any).c,
      },
    });
  } catch (error: any) {
    console.error("API /api/seed error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
