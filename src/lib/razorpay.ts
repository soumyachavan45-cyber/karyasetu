/**
 * Razorpay Payment Gateway & Invoice Generation Engine for KaryaSetu
 */

export interface RazorpayPaymentOptions {
  amount: number; // in INR
  currency: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceName: string;
  workerName: string;
  workerPayout: number; // 92%
  welfareLocker: number; // 6%
  adminFund: number; // 2%
}

export interface PaymentInvoice {
  invoiceNo: string;
  paymentId: string;
  orderId: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  serviceName: string;
  workerName: string;
  workerUan: string;
  baseAmount: number;
  workerPayout: number;
  welfareLocker: number;
  adminFund: number;
  gstAmount: number;
  totalPaid: number;
  paymentMethod: "UPI" | "Card" | "NetBanking" | "Co-op Cash";
  status: "PAID" | "SETTLED";
}

export const processRazorpayPayment = async (
  options: RazorpayPaymentOptions
): Promise<{ success: boolean; paymentId: string; invoice: PaymentInvoice }> => {
  // Simulate Razorpay transaction processing
  return new Promise((resolve) => {
    setTimeout(() => {
      const paymentId = "pay_rzp_" + Math.random().toString(36).substring(2, 10).toUpperCase();
      const invoiceNo = "INV-KS-" + new Date().getFullYear() + "-" + Math.floor(10000 + Math.random() * 90000);

      const invoice: PaymentInvoice = {
        invoiceNo,
        paymentId,
        orderId: options.orderId,
        date: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        customerName: options.customerName,
        customerPhone: options.customerPhone,
        customerAddress: "Nagpur, Maharashtra",
        serviceName: options.serviceName,
        workerName: options.workerName,
        workerUan: "UAN-8890-4412-9901",
        baseAmount: options.amount,
        workerPayout: options.workerPayout,
        welfareLocker: options.welfareLocker,
        adminFund: options.adminFund,
        gstAmount: 0, // Cooperative public utility exempt under Section 12AA
        totalPaid: options.amount,
        paymentMethod: "UPI",
        status: "SETTLED",
      };

      resolve({
        success: true,
        paymentId,
        invoice,
      });
    }, 1200);
  });
};
