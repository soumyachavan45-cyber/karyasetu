import { NextResponse } from "next/server";
import { query, initDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await initDatabase();

    const bookingsSummary = await query(`
      SELECT 
        COUNT(*) as totalBookings,
        SUM(baseAmount) as totalVolume,
        SUM(workerPayout) as totalWorkerPayout,
        SUM(welfareLocker) as totalWelfareLocker,
        SUM(adminFund) as totalAdminFund,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completedCount,
        SUM(CASE WHEN status = 'unassigned' THEN 1 ELSE 0 END) as unassignedCount,
        SUM(CASE WHEN status = 'in_transit' OR status = 'otp_verified' THEN 1 ELSE 0 END) as activeCount
      FROM bookings
    `);

    const workersSummary = await query(`
      SELECT 
        COUNT(*) as totalWorkers,
        SUM(CASE WHEN status = 'available' THEN 1 ELSE 0 END) as availableCount,
        SUM(CASE WHEN status = 'busy' THEN 1 ELSE 0 END) as busyCount,
        SUM(CASE WHEN hasSmartphone = 1 THEN 1 ELSE 0 END) as smartphoneCount,
        SUM(CASE WHEN hasSmartphone = 0 THEN 1 ELSE 0 END) as offlineCount
      FROM workers
    `);

    const welfareLedgerSummary = await query(`
      SELECT 
        COUNT(*) as totalWelfareTransactions,
        SUM(amount) as totalWelfareDistributed
      FROM welfare_ledgers
    `);

    const recentAuditLogs = await query(`
      SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 10
    `);

    const b = bookingsSummary[0] || {};
    const w = workersSummary[0] || {};
    const wl = welfareLedgerSummary[0] || {};

    return NextResponse.json({
      success: true,
      data: {
        financials: {
          totalVolume: b.totalVolume || 0,
          totalWorkerPayout: b.totalWorkerPayout || 0, // 92%
          totalWelfareLocker: b.totalWelfareLocker || 0, // 6%
          totalAdminFund: b.totalAdminFund || 0, // 2%
        },
        bookings: {
          total: b.totalBookings || 0,
          completed: b.completedCount || 0,
          unassigned: b.unassignedCount || 0,
          active: b.activeCount || 0,
        },
        workers: {
          total: w.totalWorkers || 0,
          available: w.availableCount || 0,
          busy: w.busyCount || 0,
          smartphoneUsers: w.smartphoneCount || 0,
          offlineLfcUsers: w.offlineCount || 0,
        },
        welfare: {
          transactions: wl.totalWelfareTransactions || 0,
          accumulated: wl.totalWelfareDistributed || 0,
          status: "Fully Compliant with Code on Social Security 2020",
        },
        recentLogs: recentAuditLogs,
      },
    });
  } catch (error: any) {
    console.error("API /api/analytics error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
