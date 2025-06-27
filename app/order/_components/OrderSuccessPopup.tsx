"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Package,
  Truck,
  Phone,
  MapPin,
  Clock,
  CreditCard,
  Download,
  Printer,
} from "lucide-react";
import { OrderItem } from "../page";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OrderSuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    invoice: string;
    fullName: string;
    phone: string;
    address: string;
    shippingMethod: string;
    paymentMethod: string;
    notes?: string;
    items: OrderItem[];
    subtotal: number;
    deliveryCost: number;
    total: number;
  };
}

export default function OrderSuccessPopup({
  isOpen,
  onClose,
  orderData,
}: OrderSuccessPopupProps) {
  const getShippingInfo = (method: string) => {
    if (method === "inside_dhaka") {
      return {
        title: "ঢাকার ভিতরে",
        duration: "১-৩ দিন",
        icon: <Truck className="w-4 h-4" />,
      };
    }
    return {
      title: "ঢাকার বাইরে",
      duration: "৩-৫ দিন",
      icon: <Package className="w-4 h-4" />,
    };
  };

  const shippingInfo = getShippingInfo(orderData.shippingMethod);

  // Generate PDF content
  const generatePDFContent = () => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Order Receipt - ${orderData.invoice}</title>
    <style>
        @page {
            margin: 20mm;
            size: A4;
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 20px;
        }
        .success-icon {
            width: 60px;
            height: 60px;
            background: #4CAF50;
            border-radius: 50%;
            margin: 0 auto 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 30px;
        }
        .title {
            color: #4CAF50;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .subtitle {
            color: #666;
            font-size: 16px;
        }
        .section {
            margin-bottom: 25px;
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #4CAF50;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            padding: 5px 0;
        }
        .info-label {
            font-weight: 600;
            color: #555;
        }
        .info-value {
            color: #333;
        }
        .order-number {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            font-family: 'Courier New', monospace;
            font-size: 20px;
            font-weight: bold;
            color: #1976d2;
            margin-bottom: 20px;
        }
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }
        .items-table th,
        .items-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        .items-table th {
            background: #f5f5f5;
            font-weight: bold;
            color: #333;
        }
        .items-table tr:nth-child(even) {
            background: #fafafa;
        }
        .total-section {
            background: #fff;
            padding: 15px;
            border-radius: 8px;
            border: 2px solid #4CAF50;
        }
        .total-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
        }
        .total-final {
            font-size: 20px;
            font-weight: bold;
            color: #4CAF50;
            border-top: 2px solid #4CAF50;
            padding-top: 12px;
            margin-top: 8px;
        }
        .notes-section {
            background: #fff3cd;
            border: 1px solid #ffc107;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .next-steps {
            background: #d1ecf1;
            border: 1px solid #bee5eb;
            padding: 15px;
            border-radius: 8px;
        }
        .next-steps ul {
            margin-left: 20px;
        }
        .next-steps li {
            margin-bottom: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
        }
        @media print {
            .container {
                max-width: none;
                margin: 0;
                padding: 0;
            }
            .section {
                break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="success-icon">✓</div>
            <div class="title">অর্ডার সফল হয়েছে!</div>
            <div class="subtitle">আপনার অর্ডারটি সফলভাবে প্রক্রিয়া করা হয়েছে</div>
        </div>

        <div class="order-number">
            অর্ডার নম্বর: ${orderData.invoice}
        </div>

        <div class="section">
            <div class="section-title">
                📍 ডেলিভারি তথ্য
            </div>
            <div class="info-row">
                <span class="info-label">নাম:</span>
                <span class="info-value">${orderData.fullName}</span>
            </div>
            <div class="info-row">
                <span class="info-label">ফোন:</span>
                <span class="info-value">${orderData.phone}</span>
            </div>
            <div class="info-row">
                <span class="info-label">ঠিকানা:</span>
                <span class="info-value">${orderData.address}</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">
                🚚 ডেলিভারি পদ্ধতি
            </div>
            <div class="info-row">
                <span class="info-label">পদ্ধতি:</span>
                <span class="info-value">${shippingInfo.title}</span>
            </div>
            <div class="info-row">
                <span class="info-label">সময়:</span>
                <span class="info-value">${shippingInfo.duration}</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">
                💳 পেমেন্ট পদ্ধতি
            </div>
            <div class="info-value">
                ${
                  orderData.paymentMethod === "cash_on_delivery"
                    ? "ক্যাশ অন ডেলিভারি"
                    : "অনলাইন পেমেন্ট"
                }
            </div>
        </div>

        <div class="section">
            <div class="section-title">
                📦 অর্ডার সারাংশ
            </div>
            <table class="items-table">
                <thead>
                    <tr>
                        <th>পণ্য</th>
                        <th>পরিমাণ</th>
                        <th>দাম</th>
                        <th>মোট</th>
                    </tr>
                </thead>
                <tbody>
                    ${orderData.items
                      .map(
                        (item) => `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>৳${item.price}</td>
                            <td>৳${item.price * item.quantity}</td>
                        </tr>
                    `
                      )
                      .join("")}
                </tbody>
            </table>
            
            <div class="total-section">
                <div class="total-row">
                    <span>সাবটোটাল:</span>
                    <span>৳${orderData.subtotal}</span>
                </div>
                <div class="total-row">
                    <span>ডেলিভারি চার্জ:</span>
                    <span>৳${orderData.deliveryCost}</span>
                </div>
                <div class="total-row total-final">
                    <span>মোট:</span>
                    <span>৳${orderData.total}</span>
                </div>
            </div>
        </div>

        ${
          orderData.notes
            ? `
        <div class="notes-section">
            <div class="section-title">📋 বিশেষ নির্দেশনা</div>
            <p>${orderData.notes}</p>
        </div>
        `
            : ""
        }

        <div class="next-steps">
            <div class="section-title">📋 পরবর্তী ধাপ</div>
            <ul>
                <li>আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব</li>
                <li>অর্ডার প্রস্তুত হলে SMS পাবেন</li>
                <li>ডেলিভারি ট্র্যাকিং তথ্য পাবেন</li>
            </ul>
        </div>

        <div class="footer">
            <p>অর্ডার তারিখ: ${new Date().toLocaleDateString("bn-BD")}</p>
            <p>ধন্যবাদ আমাদের সাথে কেনাকাটা করার জন্য!</p>
        </div>
    </div>
</body>
</html>
    `;
  };

  // Auto download PDF when popup opens
  const downloadPDF = () => {
    const htmlContent = generatePDFContent();
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Order-${orderData.invoice}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Print function with proper styling
  const handlePrint = () => {
    const htmlContent = generatePDFContent();
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();

      // Wait for content to load then print
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };

  // Auto download when popup opens
  useEffect(() => {
    if (isOpen && orderData) {
      // Small delay to ensure popup is fully rendered
      setTimeout(() => {
        downloadPDF();
      }, 1000);
    }
  }, [isOpen, orderData]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <ScrollArea className="overflow-auto h-[90vh] pr-4">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl font-bold text-green-600 text-center">
              অর্ডার সফল হয়েছে!
            </DialogTitle>
            <p className="text-gray-600 text-sm mt-2 text-center">
              আপনার অর্ডারটি সফলভাবে প্রক্রিয়া করা হয়েছে
            </p>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Order Number */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-blue-800">
                  অর্ডার নম্বর
                </span>
              </div>
              <p className="text-blue-900 font-mono text-lg">
                {orderData.invoice}
              </p>
            </div>

            {/* Customer Information */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                ডেলিভারি তথ্য
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">নাম:</span>
                  <span>{orderData.fullName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{orderData.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">{orderData.address}</span>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Truck className="w-4 h-4" />
                ডেলিভারি পদ্ধতি
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {shippingInfo.icon}
                    <span className="font-medium">{shippingInfo.title}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="w-3 h-3" />
                    {shippingInfo.duration}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                পেমেন্ট পদ্ধতি
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="font-medium">
                  {orderData.paymentMethod === "cash_on_delivery"
                    ? "ক্যাশ অন ডেলিভারি"
                    : "অনলাইন পেমেন্ট"}
                </span>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">অর্ডার সারাংশ</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>৳{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-sm">
                    <span>সাবটোটাল</span>
                    <span>৳{orderData.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>ডেলিভারি চার্জ</span>
                    <span>৳{orderData.deliveryCost}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                    <span>মোট</span>
                    <span>৳{orderData.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {orderData.notes && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">বিশেষ নির্দেশনা</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm">{orderData.notes}</p>
                </div>
              </div>
            )}

            {/* Next Steps */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">
                পরবর্তী ধাপ
              </h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব</li>
                <li>• অর্ডার প্রস্তুত হলে SMS পাবেন</li>
                <li>• ডেলিভারি ট্র্যাকিং তথ্য পাবেন</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex items-center gap-2"
              >
                আরো কিনুন
              </Button>
              <Button
                onClick={downloadPDF}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                ডাউনলোড
              </Button>
              <Button onClick={handlePrint} className="flex items-center gap-2">
                <Printer className="w-4 h-4" />
                প্রিন্ট
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
