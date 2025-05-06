'use client'

import { useState } from 'react'
import { uploadInvoiceToIPFS } from '@/components/ipfs'
import { useWallet } from '@solana/wallet-adapter-react'
import Wallet from '@/components/Wallet'

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
    <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-xl shadow-xl">
      <Wallet />
      <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>

      <input
        className="w-full mb-3"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="w-full mb-3"
        placeholder="Price (USDC)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        className="w-full"
        onClick={handleCreate}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create invoice'}
      </button>
    </div>
  )
}