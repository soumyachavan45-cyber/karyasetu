import { NextResponse } from "next/server";
import { query, run, initDatabase } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await initDatabase();
    const rows = await query("SELECT * FROM workers WHERE id = ? OR workerId = ?", [
      params.id,
      params.id,
    ]);

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: "Worker not found" }, { status: 404 });
    }

    const w = rows[0];
    const formatted = {
      ...w,
      verifiedAadhaar: Boolean(w.verifiedAadhaar),
      verifiedNCD: Boolean(w.verifiedNCD),
      currentLocation: { lat: w.lat, lng: w.lng, area: w.area },
      skills: JSON.parse(w.skills || "[]"),
      languages: JSON.parse(w.languages || "[]"),
      hasSmartphone: Boolean(w.hasSmartphone),
    };

    return NextResponse.json({ success: true, data: formatted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await initDatabase();
    const body = await request.json();
    const { status, lat, lng, area, addEarnings, addWelfare } = body;

    let updates: string[] = [];
    let queryParams: any[] = [];

    if (status) {
      updates.push("status = ?");
      queryParams.push(status);
    }

    if (lat !== undefined && lng !== undefined) {
      updates.push("lat = ?, lng = ?");
      queryParams.push(lat, lng);
    }

    if (area) {
      updates.push("area = ?");
      queryParams.push(area);
    }

    if (addEarnings) {
      updates.push("todayEarnings = todayEarnings + ?");
      queryParams.push(addEarnings);
    }

    if (addWelfare) {
      updates.push("todayWelfareSaved = todayWelfareSaved + ?");
      queryParams.push(addWelfare);
    }

    if (updates.length === 0) {
      return NextResponse.json({ success: false, error: "No fields to update" }, { status: 400 });
    }

    queryParams.push(params.id);
    await run(`UPDATE workers SET ${updates.join(", ")} WHERE id = ? OR workerId = ?`, [
      ...queryParams,
      params.id,
    ]);

    return NextResponse.json({ success: true, message: "Worker profile updated" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
