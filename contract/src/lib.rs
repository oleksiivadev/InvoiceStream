use anchor_lang::prelude::*;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("GDRZ5jFfwcSYKTRvMC1BVBAGQoJt73zzVFZpiy7AcdUt");

#[program]
mod invoxia_contract {
    use super::*;

    pub fn create_invoice(
        ctx: Context<CreateInvoice>,
        cid: String,
        amount: u64,
    ) -> Result<()> {
        let invoice = &mut ctx.accounts.invoice;

        invoice.cid = cid;
        invoice.amount = amount;
        invoice.created_at = Clock::get()?.unix_timestamp;
        invoice.creator = *ctx.accounts.creator.key;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateInvoice<'info> {
    #[account(init, payer = creator, space = 8 + 32 + 8 + 8 + 4 + 100)]
    pub invoice: Account<'info, Invoice>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Invoice {
    pub cid: String,          
    pub amount: u64,      
    pub created_at: i64,  
    pub creator: Pubkey,    
}