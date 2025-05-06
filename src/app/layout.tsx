'use client'

import './globals.css'
import { WalletProvider } from '@solana/wallet-adapter-react'
import { ConnectionProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { wallets, endpoint } from '@/lib/solana'
import '@solana/wallet-adapter-react-ui/styles.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white font-sans">
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <div className="min-h-screen flex flex-col items-center p-4">
                {children}
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  )
}