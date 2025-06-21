'use client'

import { useState } from 'react'
import { uploadInvoiceToIPFS } from '@/components/ipfs'
import { useWallet } from '@solana/wallet-adapter-react'
import Wallet from '@/components/Wallet'
import Link from 'next/link'

export type Invoice = {
  description: string,
  amount: string,
  from: string,
  createdAt: string,
}

export default function CreateInvoicePage() {
  const { publicKey } = useWallet()
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    if (!publicKey) return alert('Подключи кошелек')
  
    const invoice: Invoice = {
      description,
      amount,
      from: publicKey.toBase58(),
      createdAt: new Date().toISOString(),
    }
  
    setLoading(true)
    try {
      const cid = await uploadInvoiceToIPFS(invoice)
  
      const stored = JSON.parse(localStorage.getItem('invoices') || '[]')
      localStorage.setItem('invoices', JSON.stringify([
        ...stored,
        { ...invoice, cid }
      ]))
  
      alert(`✅ Invoice created! CID: ${cid}\nhttps://gateway.pinata.cloud/ipfs/${cid}`)
    } catch (e) {
      console.error(e)
      alert('Error while creating invoice')
    } finally {
      setLoading(false)
    }
  }

    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white rounded-2xl shadow-2xl border border-gray-800">
        <div className="flex justify-between items-center mb-6">
          <Wallet />
          <Link href="/">
            <button className="px-4 py-2 rounded-lg border border-gray-700 text-sm text-gray-300 hover:bg-gray-800 transition">
              ← To Main Page
            </button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center">Create Invoice</h1>

        <input
          className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="w-full mb-6 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Price (USDC)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
            loading
              ? 'bg-gray-700 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Invoice'}
        </button>
      </div>
    )
}