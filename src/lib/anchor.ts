export async function payInvoice(cid: string, amount: number): Promise<void> {
  console.log("Simulating payment...");
  console.log(`CID: ${cid}, amount: ${amount}`);
  await new Promise((res) => setTimeout(res, 1500));
  console.log("Invoice paid!");
}