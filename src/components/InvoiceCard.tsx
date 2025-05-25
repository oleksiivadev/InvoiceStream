'use client'

import Link from "next/link"

interface Props {
  invoice: {
    description: string
    amount: string
    from: string
    createdAt: string
    cid: string
  }
}

export default function InvoiceCard({ invoice }: Props) {
  return (
    <div className="bg-gray-900 text-white rounded-2xl p-4 shadow-md hover:shadow-xl transition">
      <h2 className="text-xl font-semibold mb-2">{invoice.description}</h2>
      <p className="mb-1"><strong>Price:</strong> {invoice.amount} USDC</p>
      <p className="mb-1"><strong>From:</strong> {invoice.from.slice(0, 6)}...{invoice.from.slice(-4)}</p>
      <p className="mb-2 text-sm text-gray-400">Created: {new Date(invoice.createdAt).toLocaleString()}</p>
      <div className="flex justify-between">
        <a
          href={`https://gateway.pinata.cloud/ipfs/${invoice.cid}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 text-sm"
        >
        Open in IPFS
        </a>
        <Link href={`/invoice/${invoice.cid}`} className="text-blue-400 text-sm">Open in PDF</Link>
      </div>
    </div>
  )
}
