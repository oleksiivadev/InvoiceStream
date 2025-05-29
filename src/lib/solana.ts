import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl, Connection, SystemProgram, PublicKey, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js'

export const network = WalletAdapterNetwork.Devnet
export const endpoint = clusterApiUrl(network)

export const wallets = [new PhantomWalletAdapter()]

export async function sendSolPayment(
  to: string,
  amountInSol: number
): Promise<string> {
  const provider = window.solana
  if (!provider?.isPhantom) throw new Error("Phantom Wallet not found")

  await provider.connect()

  const connection = new Connection("https://api.devnet.solana.com")
  const fromPubkey = new PublicKey(provider.publicKey.toString())
  const toPubkey = new PublicKey(to)

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey,
      toPubkey,
      lamports: amountInSol * LAMPORTS_PER_SOL,
    })
  )

  transaction.feePayer = fromPubkey
  const { blockhash } = await connection.getLatestBlockhash()
  transaction.recentBlockhash = blockhash

  const signed = await provider.signTransaction(transaction)
  const signature = await connection.sendRawTransaction(signed.serialize())
  await connection.confirmTransaction(signature)

  return signature
}

