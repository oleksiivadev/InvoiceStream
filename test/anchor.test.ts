describe("invoxia_contract", () => {
  it("Creates an invoice", async () => {
    const cid = "QmZPwnsk6qwerty...";
    const amount = new anchor.BN(100); 

    const invoiceKp = new anchor.web3.Keypair();

    const tx = await pg.program.methods
      .createInvoice(cid, amount)
      .accounts({
        invoice: invoiceKp.publicKey,
        creator: pg.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([invoiceKp])
      .rpc();

    console.log(`Transaction sent: ${tx}`);
    await pg.connection.confirmTransaction(tx);

    const invoiceAccount = await pg.program.account.invoice.fetch(invoiceKp.publicKey);
    console.log("Invoice on-chain:", invoiceAccount);

    assert.equal(invoiceAccount.cid, cid);
    assert.ok(invoiceAccount.amount.eq(amount));
    assert.equal(invoiceAccount.creator.toString(), pg.wallet.publicKey.toString());
  });
});