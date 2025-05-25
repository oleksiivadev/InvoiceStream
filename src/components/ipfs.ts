import { Invoice } from "@/app/create/page"

export async function uploadInvoiceToIPFS(invoice: Invoice): Promise<string> {
  const token = process.env.NEXT_PUBLIC_PINATA_JWT
  console.log(token);
  
  if (!token) {
    throw new Error('Pinata token is missing.')
  }

  const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(invoice),
  })

  if (!response.ok) {
    const error = await response.json()
    console.error('Pinata error:', error)
    throw new Error('Ошибка при загрузке на IPFS через Pinata')
  }

  const data = await response.json()
  return data.IpfsHash // CID
}