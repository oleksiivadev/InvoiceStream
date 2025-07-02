'use client'

import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import InvoiceCard from '@/components/InvoiceCard'
import Link from 'next/link'
import Wallet from '@/components/Wallet'

interface Invoice {
  amount: string
  cid: string
  createdAt: string
  description: string
  from: string
}

export default function HomePage() {
  const { publicKey } = useWallet()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [showMineOnly, setShowMineOnly] = useState(false)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('invoices') || '[]')
    setInvoices(stored)
  }, [])

  const filteredInvoices = showMineOnly && publicKey
    ? invoices.filter((i) => i.from === publicKey.toBase58())
    : invoices

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <Wallet />
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            📄 My Invoices
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            Total: {filteredInvoices.length}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {publicKey && (
            <button
              onClick={() => setShowMineOnly(!showMineOnly)}
              className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-600 text-gray-300 hover:bg-gray-800 transition"
            >
              {showMineOnly ? 'Show All' : 'Show Mine'}
            </button>
          )}

          <Link href="/create">
            <button className="px-5 py-2.5 text-sm font-medium rounded-xl bg-[#7A2828] text-white hover:bg-[#9e3434] transition duration-200 shadow-md">
              + Create Invoice
            </button>
          </Link>
        </div>
      </div>

      {filteredInvoices.length === 0 ? (
        <div className="text-gray-400 text-center mt-20 text-lg">
          {showMineOnly
            ? 'You have not created any invoices yet.'
            : 'No invoices found.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvoices.map((invoice, i) => (
            <InvoiceCard key={i} invoice={invoice} />
          ))}
        </div>
      )}
    </div>
  )
}
