'use client';

import Link from "next/link";

export default function HomePage() {

  return (
    <main className="min-h-screen px-4 py-16 bg-white flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">Invoxia</h1>
      <p className="text-lg text-muted-foreground max-w-xl mb-6">
        Trustless invoicing for Web3 freelancers. Create, share, and get paid in USDC — fully onchain.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <Link href={'/create'}>Create Invoice</Link>
      </div>

      <section className="max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">How it works</h2>
        <ol className="text-left space-y-3 text-base">
          <li>1️⃣ Fill in the invoice: amount, client wallet, and description.</li>
          <li>2️⃣ Share the link or QR code with your client.</li>
          <li>3️⃣ Get paid in USDC directly to your wallet via smart contract.</li>
        </ol>
      </section>

      <footer className="mt-20 text-sm text-muted-foreground">

      </footer>
    </main>
  );
}