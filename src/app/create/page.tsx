'use client';

import { useState } from "react";

export default function CreateInvoicePage() {
  const [amount, setAmount] = useState<number | string>('');
  const [description, setDescription] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [invoiceCID, setInvoiceId] = useState<boolean>(false);

  const handleCreateInvoice = async () => {
    if (!amount || !description || !recipient) {
      console.log("Please fill in all fields!");
      return;
    }

    setTimeout(() => {
        setLoading(false);
        setInvoiceId(true)
    }, 1500)
  };

  return (
    <main className="min-h-screen px-6 py-16 bg-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Create Invoice</h1>
      
      <div className="max-w-lg w-full">
        <label htmlFor="amount" className="block text-sm font-semibold mb-2">Amount (USDC)</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4"
          placeholder="Enter amount in USDC"
        />
        
        <label htmlFor="description" className="block text-sm font-semibold mb-2">Description</label>
        <input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4"
          placeholder="Describe the service"
        />

        <label htmlFor="recipient" className="block text-sm font-semibold mb-2">Recipient Wallet Address</label>
        <input
          id="recipient"
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-6"
          placeholder="Enter Solana address"
        />

        <button onClick={handleCreateInvoice}>
          {loading ? "Creating..." : "Create Invoice"}
        </button>
      </div>

      {invoiceCID && (
        <div className="mt-8 text-center">
          <h2 className="text-lg font-semibold mb-4">Invoice Created!</h2>
          <p className="text-sm text-gray-600">Use this link to view or pay the invoice:</p>
          <a
            href={`https://ipfs.io/ipfs/${invoiceCID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500"
          >
            View Invoice
          </a>

          <div className="mt-4">
          </div>
        </div>
      )}
    </main>
  );
}