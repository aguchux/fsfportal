import type { NextApiRequest, NextApiResponse } from 'next'
import dbcon from '@/models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { clientId } = req.query;

  const {
    fundingType,
    fundingWallet,
    amount,
    reference,
    transactionDate
  } = req.body;

  const { Clients, Transactions } = await dbcon();
  try {
    const client = await Clients.findOne({ _id: clientId });
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not created' })
    };

    // get all current balances
    const currentCredit = Number(client.creditBalance);
    const currentFixed = Number(client.fixedBalance);
    const currentLoan = Number(client.loanBalance);

    // update balance (Credit / Loan / Fixed)
    switch (fundingWallet) {
      case 'Credit':
        if (fundingType === 'Debit') {
          if (currentCredit < amount) {
            return res.status(200).json({ success: false, message: 'Credit: Insufficient Balance' })
          }
          client.creditBalance = currentCredit - Number(amount);
        } else if (fundingType === 'Credit') {
          client.creditBalance = currentCredit + Number(amount);
        }
        break;
      case 'Fixed':
        if (fundingType === 'Debit') {
          if (currentFixed < amount) {
            return res.status(200).json({ success: false, message: 'Fixed: Insufficient Balance' })
          }
          client.fixedBalance = currentFixed - Number(amount);
        } else if (fundingType === 'Credit') {
          client.fixedBalance = currentFixed + Number(amount);
        }
        break;
      case 'Loan':
        if (fundingType === 'Debit') {
          if (currentLoan < amount) {
            return res.status(200).json({ success: false, message: 'Loan: Insufficient Balance' })
          }
          client.loanBalance = currentLoan - Number(amount);
        } else if (fundingType === 'Credit') {
          client.loanBalance = currentLoan + Number(amount);
        } break;
      default:
        break;
    }
    
    // uPDATE cHANGES
    const saved = await client.save();
    if(!saved) {
      return res.status(200).json({ success: false, message: 'Client: Failed' })
    }

    // create transaction
    const transaction = {
      transactionType: fundingType,
      transactionStatus: 'Completed',
      amount,
      reference,
      beneficiary: client._id,
      transactionDate
    };
    const trx =  await Transactions.create(transaction);
    console.log(trx)

    if(!trx) {
      
      //Roll back changes
      client.creditBalance = currentCredit;
      client.fixedBalance = currentFixed;
      client.loanBalance = currentLoan;
      await client.save();

      return res.status(200).json({ success: false, message: 'Transaction: Failed' })
    }
    return res.status(200).json({ success: true, message: 'Funding: Success', data: client })
  } catch (error) {
    return res.status(200).json({ success: false, message: 'Funding: Failed' })
  }
}