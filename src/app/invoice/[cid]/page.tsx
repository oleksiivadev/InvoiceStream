'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import QRCode from "qrcode"; 

type InvoiceData = {
  from: string;
  description: string;
  amount: string;
  createdAt: string;
};

export default function InvoicePage() {
  const { cid } = useParams();
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null); 

  useEffect(() => {
    const fetchInvoice = async () => {
      const res = await fetch(`https://ipfs.io/ipfs/${cid}`);
      const data = await res.json();
      setInvoice(data);
    };

    if (cid) fetchInvoice();
  }, [cid]);

  useEffect(() => {
    if (!cid) return;
    const url = `${window.location.origin}/invoice/${cid}`;
    QRCode.toDataURL(url)
      .then(setQrDataUrl)
      .catch(console.error);
  }, [cid]);

  if (!invoice) {
    return <p className="text-center mt-20">Loading invoice...</p>;
  }

  const formattedDate = new Date(invoice.createdAt).toLocaleDateString();

  return (
    <main className="min-h-screen py-10 px-4 bg-gray-100 flex flex-col items-center relative">
      <div className="absolute bottom-10 left-10 text-gray-300 text-6xl font-extrabold opacity-10 rotate-[-30deg] pointer-events-none select-none print:hidden">
        Invoxia
      </div>

      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-10 print:shadow-none print:border-none relative z-10">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Invoxia</h1>
            <p className="text-sm text-gray-400">Web3 Invoice • #{cid?.toString().slice(0, 6)}...</p>
          </div>
          <div className="text-right text-sm text-gray-600">
            <p>Date:</p>
            <p>{formattedDate}</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-1">Billed From:</p>
          <p className="text-md font-medium text-gray-800">{invoice.from}</p>
        </div>

        <div className="mb-10">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left text-sm">
                <th className="p-3 border-b border-gray-300">Description</th>
                <th className="p-3 border-b border-gray-300 text-right">Amount (USDC)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-sm text-gray-700">
                <td className="p-3 border-t">{invoice.description}</td>
                <td className="p-3 border-t text-right">{invoice.amount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-sm text-gray-600 mb-6">
          <p>Thank you for using Invoxia!</p>
          <p className="mt-2">Please proceed with payment using the contract or platform link below.</p>
        </div>

        {qrDataUrl && (
          <div className="mb-6 flex justify-center print:hidden">
            <img src={qrDataUrl} alt="QR code to invoice" className="w-32 h-32" />
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-4 print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition"
        >
          Print / Save PDF
        </button>

        <button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="border border-gray-500 px-5 py-2 rounded hover:bg-gray-100 transition"
        >
          Copy Link
        </button>

        <button
          onClick={() => alert('Redirect to USDC payment coming soon!')}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
        >
          Pay via USDC
        </button>
      </div>
    </main>
  );
}