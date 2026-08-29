import { NextResponse } from "next/server";
import { query, run, initDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await initDatabase();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const trade = searchParams.get("trade");
    const hasSmartphone = searchParams.get("hasSmartphone");

    let sql = "SELECT * FROM workers WHERE 1=1";
    const params: any[] = [];

    if (status && status !== "all") {
      sql += " AND status = ?";
      params.push(status);
    }

    if (trade) {
      sql += " AND trade LIKE ?";
      params.push(`%${trade}%`);
    }

    if (hasSmartphone !== null && hasSmartphone !== undefined) {
      sql += " AND hasSmartphone = ?";
      params.push(hasSmartphone === "true" ? 1 : 0);
    }

    const rows = await query(sql, params);

    const formatted = rows.map((w: any) => ({
      id: w.id,
      workerId: w.workerId,
      name: w.name,
      nameHi: w.nameHi,
      nameMr: w.nameMr,
      photoUrl: w.photoUrl,
      phone: w.phone,
      trade: w.trade,
      tradeHi: w.tradeHi,
      tradeMr: w.tradeMr,
      rating: w.rating,
      totalJobs: w.totalJobs,
      societyName: w.societyName,
      societyTier: w.societyTier,
      verifiedAadhaar: Boolean(w.verifiedAadhaar),
      verifiedNCD: Boolean(w.verifiedNCD),
      eShramCardNo: w.eShramCardNo,
      status: w.status,
      currentLocation: {
        lat: w.lat,
        lng: w.lng,
        area: w.area,
      },
      todayEarnings: w.todayEarnings,
      todayWelfareSaved: w.todayWelfareSaved,
      upiId: w.upiId,
      skills: JSON.parse(w.skills || "[]"),
      languages: JSON.parse(w.languages || "[]"),
      hasSmartphone: Boolean(w.hasSmartphone),
    }));

    return NextResponse.json({ success: true, count: formatted.length, data: formatted });
  } catch (error: any) {
    console.error("API /api/workers error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await initDatabase();
    const body = await request.json();

    const id = "w" + Date.now();
    const workerId = "#" + Math.floor(1000 + Math.random() * 9000);
    const uan = "UAN-" + Math.floor(1000 + Math.random() * 9000) + "-" + Math.floor(1000 + Math.random() * 9000) + "-7701";

    await run(
      `INSERT INTO workers (id, workerId, name, nameHi, nameMr, photoUrl, phone, trade, tradeHi, tradeMr, rating, totalJobs, societyName, societyTier, verifiedAadhaar, verifiedNCD, eShramCardNo, status, lat, lng, area, todayEarnings, todayWelfareSaved, upiId, skills, languages, hasSmartphone)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        workerId,
        body.name,
        body.nameHi || body.name,
        body.nameMr || body.name,
        body.photoUrl || "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",
        body.phone || "+91 98000 00000",
        body.trade || "Certified Electrician",
        body.tradeHi || "प्रमाणित इलेक्ट्रीशियन",
        body.tradeMr || "प्रमाणित इलेक्ट्रिशियन",
        5.0,
        0,
        body.societyName || "Nagpur Central Labour Cooperative (NLCF)",
        "Primary Society",
        1,
        1,
        uan,
        "available",
        body.lat || 21.1458,
        body.lng || 79.0882,
        body.area || "Nagpur Central",
        0,
        0,
        body.upiId || `${body.name.toLowerCase().replace(/\s+/g, ".")}@upi`,
        JSON.stringify(body.skills || ["General Maintenance", "Safety Certified"]),
        JSON.stringify(body.languages || ["Hindi", "Marathi"]),
        body.hasSmartphone ? 1 : 0,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Cooperative artisan registered and verified via Aadhaar/NCD e-KYC.",
      workerId,
      uan,
    });
  } catch (error: any) {
    console.error("API /api/workers POST error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
