'use client'

import { useEffect, useState } from 'react'
import InvoiceCard from '@/components/InvoiceCard'
import Link from 'next/link'

interface Invoice {
  amount: string
  cid: string
  createdAt: string
  description: string
  from: string
}

export default function HomePage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('invoices') || '[]')
    setInvoices(stored)
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          📄 My Invoices
        </h1>
        <Link href="/create">
          <button className="px-5 py-2.5 text-sm font-medium rounded-xl bg-[#7A2828] text-white hover:bg-[#9e3434] transition duration-200 shadow-md">
            + Create Invoice
          </button>
        </Link>
      </div>

      {invoices.length === 0 ? (
        <div className="text-gray-400 text-center mt-20 text-lg">
          No invoices created yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {invoices.map((invoice, i) => (
            <InvoiceCard key={i} invoice={invoice} />
          ))}
        </div>
      )}
    </div>
  )
}
