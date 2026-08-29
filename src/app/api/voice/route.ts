import { NextResponse } from "next/server";
import { query, initDatabase } from "@/lib/db";

export async function POST(request: Request) {
  try {
    await initDatabase();
    const body = await request.json();
    const { text, language = "hi" } = body;

    const lower = (text || "").toLowerCase();

    let intent = "unknown";
    let speechOutput = "";
    let actionPayload: any = null;

    // Intent 1: Locate next job / Where is my job
    if (
      lower.includes("next job") ||
      lower.includes("अगला काम") ||
      lower.includes("पुढचे काम") ||
      lower.includes("कहाँ") ||
      lower.includes("कुठे")
    ) {
      intent = "find_job";
      const unassignedRows = await query(
        "SELECT * FROM bookings WHERE status = 'unassigned' OR status = 'in_transit' LIMIT 1"
      );
      if (unassignedRows.length > 0) {
        const job = unassignedRows[0];
        actionPayload = { bookingId: job.id, area: job.area, payout: job.workerPayout };
        speechOutput =
          language === "hi"
            ? `आपका काम ${job.area} में है। कार्य: ${job.serviceName}। ₹${job.workerPayout} का सीधा भुगतान मिलेगा।`
            : language === "mr"
            ? `तुमचे काम ${job.area} येथे आहे. ₹${job.workerPayout} चा मोबदला मिळेल.`
            : `Your job is at ${job.area} for ${job.serviceName}. Direct payout: ₹${job.workerPayout}.`;
      } else {
        speechOutput =
          language === "hi"
            ? "वर्तमान में कोई नया काम लंबित नहीं है। आप भुवन रडार पर ऑनलाइन हैं।"
            : language === "mr"
            ? "सध्या कोणतेही नवीन काम नाही. तुम्ही ऑनलाइन आहात."
            : "No pending jobs currently. You are online on radar.";
      }
    }
    // Intent 2: Check earnings / Wallet
    else if (
      lower.includes("earning") ||
      lower.includes("कमाई") ||
      lower.includes("पैसे") ||
      lower.includes("बैलेंस") ||
      lower.includes("wallet")
    ) {
      intent = "check_earnings";
      const workerRows = await query("SELECT * FROM workers WHERE id = 'w1'");
      const w = workerRows[0] || { todayEarnings: 1280, todayWelfareSaved: 84 };
      actionPayload = { todayEarnings: w.todayEarnings, todayWelfareSaved: w.todayWelfareSaved };
      speechOutput =
        language === "hi"
          ? `आज की आपकी कुल कमाई ₹${w.todayEarnings} है। 92% UPI द्वारा आपके बैंक में जमा कर दी गई है।`
          : language === "mr"
          ? `आजची तुमची कमाई ₹${w.todayEarnings} आहे.`
          : `Your today's earnings are ₹${w.todayEarnings}, settled directly to your bank.`;
    }
    // Intent 3: e-Shram Pension / Welfare
    else if (
      lower.includes("pension") ||
      lower.includes("ई-श्रम") ||
      lower.includes("पेन्शन") ||
      lower.includes("सुरक्षा") ||
      lower.includes("welfare")
    ) {
      intent = "check_welfare";
      const workerRows = await query("SELECT * FROM workers WHERE id = 'w1'");
      const w = workerRows[0] || { todayWelfareSaved: 84 };
      actionPayload = { todayWelfareSaved: w.todayWelfareSaved };
      speechOutput =
        language === "hi"
          ? `आपके ई-श्रम सामाजिक सुरक्षा फंड में आज ₹${w.todayWelfareSaved} जमा हैं। स्थिति: पूर्णतः सुरक्षित।`
          : language === "mr"
          ? `तुमच्या ई-श्रम खात्यात आज ₹${w.todayWelfareSaved} सुरक्षित आहेत.`
          : `₹${w.todayWelfareSaved} allocated today to your e-Shram Pension & Accident Fund.`;
    }
    // Default intent
    else {
      intent = "general_query";
      speechOutput =
        language === "hi"
          ? "सहकारगिग भाषिणी सेवा में आपका स्वागत है। आप काम खोजने या कमाई जानने के लिए बोल सकते हैं।"
          : language === "mr"
          ? "सहकारगिग भाषिणी सेवेत आपले स्वागत आहे. बोला."
          : "Welcome to SahakarGig Bhashini voice assistant. Speak to find jobs or check earnings.";
    }

    return NextResponse.json({
      success: true,
      intent,
      recognizedText: text,
      speechOutput,
      actionPayload,
    });
  } catch (error: any) {
    console.error("API /api/voice error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
