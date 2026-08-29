import { NextResponse } from "next/server";
import { query, initDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await initDatabase();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let sql = "SELECT * FROM services";
    const params: any[] = [];

    if (category && category !== "all") {
      sql += " WHERE category = ?";
      params.push(category);
    }

    const rows = await query(sql, params);

    const formatted = rows.map((r: any) => ({
      ...r,
      popularServices: JSON.parse(r.popularServices || "[]"),
    }));

    return NextResponse.json({ success: true, count: formatted.length, data: formatted });
  } catch (error: any) {
    console.error("API /api/services error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
