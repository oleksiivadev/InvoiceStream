'use client'

import { useEffect, useState } from 'react'
import InvoiceCard from '@/components/InvoiceCard'
import Link from 'next/link'

export default function HomePage() {
  const [invoices, setInvoices] = useState<any[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('invoices') || '[]')
    setInvoices(stored)
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6 items-center">
        <h1 className="text-3xl font-bold">📄 My Invoices</h1>
        <Link href="/create">
          <button className="shadow-md transition">
            + Create Invoice
          </button>
        </Link>
      </div>

      {invoices.length === 0 ? (
        <p className="text-gray-400">No invoices created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {invoices.map((invoice, i) => (
            <InvoiceCard key={i} invoice={invoice} />
          ))}
        </div>
      )}
    </div>
  )
}