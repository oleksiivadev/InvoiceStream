'use client'

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
      <a
        href={`https://gateway.pinata.cloud/ipfs/${invoice.cid}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 underline text-sm"
      >
        🔗 Open in IPFS
      </a>
    </div>
  )
}
