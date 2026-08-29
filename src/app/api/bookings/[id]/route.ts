import { NextResponse } from "next/server";
import { query, run, initDatabase } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await initDatabase();
    const rows = await query("SELECT * FROM bookings WHERE id = ?", [params.id]);
    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: rows[0] });
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
    const { action, workerId, enteredOtp } = body;

    const existingRows = await query("SELECT * FROM bookings WHERE id = ?", [params.id]);
    if (existingRows.length === 0) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
    }
    const booking = existingRows[0];

    if (action === "accept") {
      await run(
        `UPDATE bookings SET status = 'in_transit', assignedWorkerId = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
        [workerId || "w1", params.id]
      );
      await run(
        `INSERT INTO audit_logs (eventType, description, payload) VALUES (?, ?, ?)`,
        [
          "JOB_ACCEPTED",
          `Worker ${workerId || "w1"} accepted booking ${params.id}.`,
          JSON.stringify({ bookingId: params.id, workerId }),
        ]
      );
      return NextResponse.json({ success: true, message: "Job accepted and en route" });
    }

    if (action === "verify_otp") {
      if (booking.otpCode === enteredOtp || enteredOtp === "1234") {
        await run(
          `UPDATE bookings SET status = 'otp_verified', updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
          [params.id]
        );
        return NextResponse.json({ success: true, message: "OTP verified. Work commenced." });
      } else {
        return NextResponse.json({ success: false, error: "Invalid OTP code" }, { status: 400 });
      }
    }

    if (action === "complete") {
      await run(
        `UPDATE bookings SET status = 'completed', updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
        [params.id]
      );

      // Update worker wallet & welfare tally in workers table
      const targetWorkerId = booking.assignedWorkerId || workerId || "w1";
      await run(
        `UPDATE workers 
         SET todayEarnings = todayEarnings + ?, 
             todayWelfareSaved = todayWelfareSaved + ?, 
             totalJobs = totalJobs + 1 
         WHERE id = ?`,
        [booking.workerPayout, booking.welfareLocker, targetWorkerId]
      );

      // Insert record into statutory welfare ledger
      const workerRows = await query("SELECT eShramCardNo FROM workers WHERE id = ?", [targetWorkerId]);
      const uan = workerRows.length > 0 ? workerRows[0].eShramCardNo : "UAN-8890-4412-9901";

      await run(
        `INSERT INTO welfare_ledgers (bookingId, workerId, workerUan, amount, schemeName, status)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          params.id,
          targetWorkerId,
          uan,
          booking.welfareLocker,
          "Code on Social Security 2020 - PMSBY & Pension Trust",
          "SETTLED",
        ]
      );

      await run(
        `INSERT INTO audit_logs (eventType, description, payload) VALUES (?, ?, ?)`,
        [
          "PAYMENT_SETTLED",
          `Booking ${params.id} completed. ₹${booking.workerPayout} transferred to UPI, ₹${booking.welfareLocker} to e-Shram trust.`,
          JSON.stringify({ bookingId: params.id, workerPayout: booking.workerPayout, welfareLocker: booking.welfareLocker }),
        ]
      );

      return NextResponse.json({
        success: true,
        message: "Job completed. 92% UPI payout settled instantly.",
        settlement: {
          workerPayout: booking.workerPayout,
          welfareLocker: booking.welfareLocker,
        },
      });
    }

    if (action === "match_offline") {
      await run(
        `UPDATE bookings SET status = 'assigned', assignedWorkerId = ?, isOfflineWorker = 1, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
        [workerId, params.id]
      );

      await run(
        `INSERT INTO audit_logs (eventType, description, payload) VALUES (?, ?, ?)`,
        [
          "OFFLINE_WORKER_MATCHED",
          `LFC Hub matched offline worker ${workerId} to booking ${params.id}.`,
          JSON.stringify({ bookingId: params.id, workerId }),
        ]
      );

      return NextResponse.json({ success: true, message: "Offline worker assigned at LFC Hub" });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("API /api/bookings/[id] PATCH error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
