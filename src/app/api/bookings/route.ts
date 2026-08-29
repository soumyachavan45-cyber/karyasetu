import { NextResponse } from "next/server";
import { query, run, initDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await initDatabase();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const city = searchParams.get("city");
    const workerId = searchParams.get("workerId");

    let sql = `
      SELECT b.*, 
             w.name as workerName, w.phone as workerPhone, w.trade as workerTrade, 
             w.rating as workerRating, w.photoUrl as workerPhoto, w.eShramCardNo as workerUan,
             w.hasSmartphone as workerHasSmartphone
      FROM bookings b
      LEFT JOIN workers w ON b.assignedWorkerId = w.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status && status !== "all") {
      sql += " AND b.status = ?";
      params.push(status);
    }

    if (city) {
      sql += " AND b.city LIKE ?";
      params.push(`%${city}%`);
    }

    if (workerId) {
      sql += " AND (b.assignedWorkerId = ? OR b.assignedWorkerId IS NULL)";
      params.push(workerId);
    }

    sql += " ORDER BY b.createdAt DESC";

    const rows = await query(sql, params);

    const formatted = rows.map((b: any) => ({
      id: b.id,
      customerName: b.customerName,
      customerPhone: b.customerPhone,
      serviceId: b.serviceId,
      serviceName: b.serviceName,
      category: b.category,
      area: b.area,
      city: b.city,
      lat: b.lat,
      lng: b.lng,
      timestamp: b.timestamp,
      status: b.status,
      baseAmount: b.baseAmount,
      workerPayout: b.workerPayout,
      welfareLocker: b.welfareLocker,
      adminFund: b.adminFund,
      otpCode: b.otpCode,
      isOfflineWorker: Boolean(b.isOfflineWorker),
      notes: b.notes,
      assignedWorker: b.assignedWorkerId
        ? {
            id: b.assignedWorkerId,
            name: b.workerName,
            phone: b.workerPhone,
            trade: b.workerTrade,
            rating: b.workerRating,
            photoUrl: b.workerPhoto,
            eShramCardNo: b.workerUan,
            hasSmartphone: Boolean(b.workerHasSmartphone),
          }
        : undefined,
    }));

    return NextResponse.json({ success: true, count: formatted.length, data: formatted });
  } catch (error: any) {
    console.error("API /api/bookings error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await initDatabase();
    const body = await request.json();

    const baseAmount = Number(body.baseAmount || 350);
    const workerPayout = Number((baseAmount * 0.92).toFixed(1));
    const welfareLocker = Number((baseAmount * 0.06).toFixed(1));
    const adminFund = Number((baseAmount * 0.02).toFixed(1));
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const id = "BK-" + Math.floor(9050 + Math.random() * 900);

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    await run(
      `INSERT INTO bookings (id, customerName, customerPhone, serviceId, serviceName, category, area, city, lat, lng, timestamp, status, baseAmount, workerPayout, welfareLocker, adminFund, assignedWorkerId, otpCode, isOfflineWorker, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        body.customerName || "Customer",
        body.customerPhone || "+91 98000 00000",
        body.serviceId || "electrical",
        body.serviceName || "Service Request",
        body.category || "core",
        body.area || "Dharampeth, Nagpur",
        body.city || "Nagpur",
        body.lat || 21.1458 + (Math.random() - 0.5) * 0.04,
        body.lng || 79.0882 + (Math.random() - 0.5) * 0.04,
        timeString,
        "unassigned",
        baseAmount,
        workerPayout,
        welfareLocker,
        adminFund,
        body.assignedWorkerId || null,
        randomOtp,
        0,
        body.notes || "Booked via SahakarGig digital marketplace",
      ]
    );

    // Audit log
    await run(
      `INSERT INTO audit_logs (eventType, description, payload) VALUES (?, ?, ?)`,
      [
        "BOOKING_CREATED",
        `Booking ${id} created for ${body.serviceName}. 92% direct payout allocated (₹${workerPayout}).`,
        JSON.stringify({ bookingId: id, baseAmount, workerPayout, welfareLocker, otp: randomOtp }),
      ]
    );

    return NextResponse.json({
      success: true,
      data: {
        id,
        otpCode: randomOtp,
        workerPayout,
        welfareLocker,
        adminFund,
      },
    });
  } catch (error: any) {
    console.error("API /api/bookings POST error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
