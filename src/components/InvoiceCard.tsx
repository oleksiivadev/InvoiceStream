'use client'

import Link from "next/link"
import { useState } from "react"
import { payInvoice } from "@/lib/anchor"
import { sendSolPayment } from "@/lib/solana"

interface Props {
  invoice: {
    description: string
    amount: string
    from: string
    createdAt: string
    cid: string
    paid?: boolean
  }
  currentUser?: string
}

export default function InvoiceCard({ invoice, currentUser }: Props) {
  const [isPaying, setIsPaying] = useState(false)
  const [paid, setPaid] = useState(invoice.paid || false)

  const handlePay = async () => {
    setIsPaying(true)
    try {
      await sendSolPayment(invoice.from, 0.000001)

      await payInvoice(invoice.cid, parseFloat(invoice.amount))
      
      setPaid(true)
    } catch (error) {
      alert(`Payment error: ${error}`)
    } finally {
      setIsPaying(false)
    }
  }

  const isOwner = currentUser === invoice.from

  return (
    <div className={`rounded-2xl p-4 shadow-md transition space-y-2
      ${paid ? "bg-green-900/70" : "bg-gray-900 hover:shadow-xl text-white"}`}>
      <h2 className="text-xl font-semibold">{invoice.description}</h2>
      <p><strong>Price:</strong> {invoice.amount} USDC</p>
      <p><strong>From:</strong> {invoice.from.slice(0, 6)}...{invoice.from.slice(-4)}</p>
      <p className="text-sm text-gray-400">
        Created: {new Date(invoice.createdAt).toLocaleString()}
      </p>

      <div className="flex justify-between items-center pt-2 border-t border-gray-700 mt-2">
        <a
          href={`https://gateway.pinata.cloud/ipfs/${invoice.cid}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 text-sm"
        >
          Open in IPFS
        </a>
        <Link href={`/invoice/${invoice.cid}`} className="text-blue-400 text-sm">
          Open in PDF
        </Link>
      </div>

      {!paid && !isOwner && (
        <button
          onClick={handlePay}
          disabled={isPaying}
          className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white rounded-md py-2 transition"
        >
          {isPaying ? "Paying..." : "Pay"}
        </button>
      )}

      {paid && (
        <p className="text-green-400 text-sm mt-2 font-medium">Paid</p>
      )}

      {isOwner && !paid && (
        <p className="text-yellow-400 text-sm mt-2 font-medium">Pending payment</p>
      )}
    </div>
  )
}