"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { X, Printer, QrCode, ShieldCheck, CheckCircle2, Scissors, Building } from "lucide-react";
import { formatINR } from "@/lib/utils";

export const PhysicalJobTicketModal: React.FC = () => {
  const { activePrintTicketBooking, closePrintTicketModal, currentWorker, language } = useApp();

  if (!activePrintTicketBooking) return null;

  const booking = activePrintTicketBooking;
  const worker = booking.assignedWorker || currentWorker;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#121314] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161719] no-print">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Labour Felicitation Centre (LFC) - Physical Job Card
              </h3>
              <p className="text-[11px] text-zinc-400 font-mono">
                Official Physical Dispatch Ticket for Non-Smartphone Artisans
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 text-black hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
            >
              <Printer className="w-4 h-4" />
              <span>Print Job Ticket (Ctrl+P)</span>
            </button>
            <button
              onClick={closePrintTicketModal}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Ticket Area */}
        <div className="p-6 overflow-y-auto bg-white text-black" id="printable-job-ticket">
          {/* Top Organization Header */}
          <div className="border-b-2 border-black pb-3 text-center">
            <div className="flex items-center justify-between text-left mb-1">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 block">
                  GOVERNMENT OF MAHARASHTRA • COOPERATIVES DEPT
                </span>
                <h1 className="text-lg font-black tracking-tight text-black">
                  NAGPUR CENTRAL DISTRICT LABOUR COOPERATIVE FEDERATION LTD.
                </h1>
                <p className="text-[11px] font-serif text-zinc-700">
                  Labour Felicitation Centre (LFC) • Reg. No: NCD/MH/2021/7889
                </p>
              </div>
              <div className="w-14 h-14 border-2 border-black rounded-lg flex flex-col items-center justify-center p-1 text-center bg-zinc-50">
                <span className="text-[8px] font-bold uppercase leading-none">NLCF</span>
                <ShieldCheck className="w-6 h-6 text-black my-0.5" />
                <span className="text-[7px] font-mono leading-none">VERIFIED</span>
              </div>
            </div>
            <div className="bg-black text-white text-xs font-bold py-1 px-3 uppercase tracking-wider flex justify-between">
              <span>WORK ORDER & JOB CARD: #{booking.id}</span>
              <span>ISSUED: {new Date().toLocaleDateString("en-IN")} • {booking.timestamp}</span>
            </div>
          </div>

          {/* Grid Information */}
          <div className="grid grid-cols-2 gap-4 my-4 text-xs">
            {/* Worker Assigned */}
            <div className="border border-zinc-400 rounded p-2.5 bg-zinc-50">
              <h4 className="font-bold text-[11px] uppercase tracking-wider text-zinc-600 mb-1.5 border-b border-zinc-300 pb-1">
                1. Assigned Artisan (सहकारी कामगार)
              </h4>
              <div className="space-y-1">
                <p className="font-bold text-sm text-black">{worker.name}</p>
                <p className="text-zinc-700">
                  <strong>ID:</strong> {worker.workerId} | <strong>Trade:</strong> {worker.trade}
                </p>
                <p className="text-zinc-700">
                  <strong>e-Shram UAN:</strong> {worker.eShramCardNo}
                </p>
                <p className="text-zinc-700">
                  <strong>Primary Society:</strong> {worker.societyName}
                </p>
                <p className="text-emerald-800 font-semibold text-[11px]">
                  ✓ Aadhaar e-KYC Certified • Police Clearance Recorded
                </p>
              </div>
            </div>

            {/* Customer & Location */}
            <div className="border border-zinc-400 rounded p-2.5 bg-zinc-50">
              <h4 className="font-bold text-[11px] uppercase tracking-wider text-zinc-600 mb-1.5 border-b border-zinc-300 pb-1">
                2. Customer & Job Location (ग्राहक तपशील)
              </h4>
              <div className="space-y-1">
                <p className="font-bold text-sm text-black">{booking.customerName}</p>
                <p className="text-zinc-700">
                  <strong>Contact Phone:</strong> {booking.customerPhone}
                </p>
                <p className="text-zinc-700">
                  <strong>Address:</strong> {booking.area}, {booking.city}
                </p>
                <p className="text-zinc-700">
                  <strong>Service:</strong> {booking.serviceName}
                </p>
                <p className="text-zinc-700 font-mono text-[10px]">
                  <strong>Notes:</strong> {booking.notes || "Standard verified cooperative dispatch."}
                </p>
              </div>
            </div>
          </div>

          {/* Wage & Welfare Table */}
          <div className="border border-black rounded overflow-hidden mb-4 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-200 border-b border-black text-[11px] font-bold uppercase">
                  <th className="p-2 border-r border-black">Statutory Allocation Item</th>
                  <th className="p-2 border-r border-black">Share %</th>
                  <th className="p-2 border-r border-black">Disbursement Rail</th>
                  <th className="p-2 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-300">
                <tr>
                  <td className="p-2 font-bold border-r border-black">
                    Worker Direct Take-Home Wage
                  </td>
                  <td className="p-2 font-mono border-r border-black">92.0%</td>
                  <td className="p-2 border-r border-black">LFC Cash Desk / Instant Bank Transfer</td>
                  <td className="p-2 text-right font-bold font-mono">
                    {formatINR(booking.workerPayout)}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-black">
                    National e-Shram Welfare & Pension Fund
                  </td>
                  <td className="p-2 font-mono border-r border-black">6.0%</td>
                  <td className="p-2 border-r border-black">Code on Social Security 2020 Trust</td>
                  <td className="p-2 text-right font-mono">{formatINR(booking.welfareLocker)}</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-black">
                    Cooperative LFC Administrative & Tool Maintenance
                  </td>
                  <td className="p-2 font-mono border-r border-black">2.0%</td>
                  <td className="p-2 border-r border-black">Federation Physical Office Ledger</td>
                  <td className="p-2 text-right font-mono">{formatINR(booking.adminFund)}</td>
                </tr>
                <tr className="bg-zinc-100 font-bold border-t-2 border-black">
                  <td className="p-2 border-r border-black" colSpan={3}>
                    TOTAL PRE-FIXED CUSTOMER INVOICE (No Hidden Surge Fees)
                  </td>
                  <td className="p-2 text-right font-mono text-sm">
                    {formatINR(booking.baseAmount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Verification Code Box */}
          <div className="flex items-center justify-between border-2 border-dashed border-zinc-400 p-3 rounded bg-zinc-50 mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 block">
                CUSTOMER 4-DIGIT VERIFICATION CODE (सुरक्षा कोड)
              </span>
              <p className="text-[11px] text-zinc-700">
                Ask customer to verify this code prior to starting work:
              </p>
            </div>
            <div className="text-2xl font-black font-mono tracking-widest bg-black text-white px-4 py-1.5 rounded">
              {booking.otpCode}
            </div>
          </div>

          {/* Tear-off Cash Receipt Voucher for LFC */}
          <div className="border-t-2 border-dashed border-black pt-3">
            <div className="flex items-center gap-1 text-[10px] text-zinc-500 uppercase font-mono mb-2">
              <Scissors className="w-3.5 h-3.5" />
              <span>TEAR-OFF SECTION: LFC CASH DESK DISBURSEMENT VOUCHER</span>
            </div>

            <div className="flex items-center justify-between bg-zinc-100 p-3 rounded border border-zinc-400 text-xs">
              <div>
                <p className="font-bold text-black">
                  Voucher #{booking.id}-PAY • Artisan: {worker.name} ({worker.workerId})
                </p>
                <p className="text-zinc-600 text-[10px]">
                  Present to LFC Cashier after receiving signature from customer upon job completion.
                </p>
                <div className="mt-2 flex gap-6 text-[10px]">
                  <span>Customer Sign: ____________________</span>
                  <span>LFC Manager Sign: ____________________</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-zinc-500 block">
                  PAYABLE CASH AMOUNT
                </span>
                <span className="text-lg font-black font-mono text-black">
                  {formatINR(booking.workerPayout)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#161719] flex justify-end no-print">
          <button
            onClick={closePrintTicketModal}
            className="px-4 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-white/5 rounded-lg transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
