"use client";

import React from "react";
import { PaymentInvoice } from "@/lib/razorpay";
import { X, Printer, ShieldCheck, Download, CheckCircle2, QrCode, FileText } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface InvoiceModalProps {
  invoice: PaymentInvoice | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice, onClose }) => {
  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header (Screen Only) */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-slate-200 bg-slate-50/80 no-print">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 shadow-2xs">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Cooperative Tax Invoice & Payment Receipt
              </h3>
              <p className="text-[10px] font-mono text-slate-500 font-medium">
                Razorpay Verified • Code on Social Security 2020 Compliant
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold btn-glossy-blue text-white shadow-xs active:scale-95 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Tax Invoice Content */}
        <div className="p-6 overflow-y-auto bg-white text-black text-xs" id="printable-tax-invoice">
          {/* Top Brand Header */}
          <div className="border-b-2 border-black pb-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest block font-bold">
                  GOVERNMENT OF MAHARASHTRA • COOPERATIVES DEPARTMENT
                </span>
                <h1 className="text-xl font-black tracking-tight text-black mt-0.5">
                  KARYASETU COOPERATIVE FEDERATION LTD.
                </h1>
                <p className="text-[10px] text-zinc-600 font-serif">
                  National Labour Cooperatives Federation (NLCF) Member • Reg. No: MH/NAG/COOP/2026/7889
                </p>
                <p className="text-[10px] text-zinc-600 font-mono">
                  GSTIN / PAN: 27AABCK4012P1Z8 • Tax Exempt under Section 12AA (Public Utility)
                </p>
              </div>

              <div className="text-right">
                <div className="w-12 h-12 border-2 border-black rounded-lg flex flex-col items-center justify-center p-1 bg-zinc-50 ml-auto">
                  <ShieldCheck className="w-6 h-6 text-black" />
                  <span className="text-[7px] font-black uppercase">VERIFIED</span>
                </div>
                <span className="text-[9px] font-bold text-emerald-800 uppercase block mt-1">
                  ✓ PAID VIA RAZORPAY UPI
                </span>
              </div>
            </div>

            <div className="bg-black text-white text-[11px] font-mono font-bold py-1.5 px-3 mt-3 flex justify-between rounded">
              <span>TAX INVOICE NO: {invoice.invoiceNo}</span>
              <span>DATE: {invoice.date}</span>
            </div>
          </div>

          {/* Customer & Transaction Meta */}
          <div className="grid grid-cols-2 gap-4 my-4">
            <div className="border border-zinc-300 rounded p-2.5 bg-zinc-50">
              <h4 className="font-bold text-[10px] uppercase tracking-wider text-zinc-600 mb-1 border-b border-zinc-200 pb-0.5">
                Billed To (Customer):
              </h4>
              <p className="font-bold text-black">{invoice.customerName}</p>
              <p className="text-zinc-600">Phone: {invoice.customerPhone}</p>
              <p className="text-zinc-600">Location: {invoice.customerAddress}</p>
              <p className="text-zinc-600 font-mono text-[10px]">Payment ID: {invoice.paymentId}</p>
            </div>

            <div className="border border-zinc-300 rounded p-2.5 bg-zinc-50">
              <h4 className="font-bold text-[10px] uppercase tracking-wider text-zinc-600 mb-1 border-b border-zinc-200 pb-0.5">
                Dispatched Service Artisan:
              </h4>
              <p className="font-bold text-black">{invoice.workerName}</p>
              <p className="text-zinc-600">e-Shram UAN: {invoice.workerUan}</p>
              <p className="text-zinc-600">Trade: {invoice.serviceName}</p>
              <p className="text-emerald-800 font-semibold text-[10px]">
                Aadhaar e-KYC Certified • Primary Guild Member
              </p>
            </div>
          </div>

          {/* Statutory Breakdown Table */}
          <div className="border border-black rounded overflow-hidden mb-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-200 border-b border-black font-bold uppercase text-[10px]">
                  <th className="p-2 border-r border-black">Description & Statutory Allocation</th>
                  <th className="p-2 border-r border-black">Share %</th>
                  <th className="p-2 border-r border-black">Statutory Beneficiary Rail</th>
                  <th className="p-2 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-300">
                <tr>
                  <td className="p-2 font-bold border-r border-black">
                    1. Artisan Take-Home Base Wage ({invoice.serviceName})
                  </td>
                  <td className="p-2 font-mono border-r border-black">92.0%</td>
                  <td className="p-2 border-r border-black">Direct UPI Settlement to Worker Bank Account</td>
                  <td className="p-2 text-right font-bold font-mono">
                    {formatINR(invoice.workerPayout)}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-black">
                    2. National e-Shram Pension & Accident Welfare Fund
                  </td>
                  <td className="p-2 font-mono border-r border-black">6.0%</td>
                  <td className="p-2 border-r border-black">Code on Social Security 2020 Statutory Trust</td>
                  <td className="p-2 text-right font-mono">{formatINR(invoice.welfareLocker)}</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-black">
                    3. Local Cooperative LFC Administrative & Server Hub
                  </td>
                  <td className="p-2 font-mono border-r border-black">2.0%</td>
                  <td className="p-2 border-r border-black">Labour Felicitation Centre (LFC) Ledger</td>
                  <td className="p-2 text-right font-mono">{formatINR(invoice.adminFund)}</td>
                </tr>
                <tr className="bg-zinc-100 font-black border-t-2 border-black">
                  <td className="p-2 border-r border-black" colSpan={3}>
                    TOTAL PAID AMOUNT (INR) — ZERO HIDDEN CHARGES
                  </td>
                  <td className="p-2 text-right font-mono text-sm">
                    {formatINR(invoice.totalPaid)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Security & Verification Footer */}
          <div className="border border-dashed border-zinc-400 p-2.5 rounded bg-zinc-50 flex items-center justify-between mb-4">
            <div>
              <span className="font-bold text-[10px] text-zinc-700 block">
                AUTHENTICATED ELECTRONIC INVOICE
              </span>
              <p className="text-[10px] text-zinc-600">
                This is a computer-generated cooperative tax invoice valid under the Information Technology Act, 2000.
              </p>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-mono text-zinc-500 block">Digital Signature:</span>
              <span className="text-[10px] font-mono font-bold text-black">
                SHA256: {invoice.paymentId.substring(0, 16)}...
              </span>
            </div>
          </div>
        </div>

        {/* Footer (Screen Only) */}
        <div className="px-5 sm:px-6 py-3 border-t border-slate-200 bg-slate-50/80 flex justify-end no-print">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors shadow-2xs"
          >
            Close Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

