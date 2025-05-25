'use client'

import dynamic from 'next/dynamic'

const WalletMultiButtonDynamic = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
)

export default function Wallet() {
  return (
    <div>
      <WalletMultiButtonDynamic />
    </div>
  )
}