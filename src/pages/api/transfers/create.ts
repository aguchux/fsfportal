import type { NextApiRequest, NextApiResponse } from 'next'
import dbcon from '@/models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const { clientId } = req.query;
  const data = req.body;
  const {
    targetAccount,
    amount,
    accountName,
    accountNumber,
    bankName,
    bankCode,
    SortCode,
    routingNumber,
    ibanNumber,
    reference,
    verificationCode
  } = data;
  const { Transfers, Clients, Transactions } = await dbcon();

  try {

    // find client
    const client = await Clients.findOne({ _id: clientId });

    // find similar transfer
    const transfer = await Transfers.findOne({ targetAccount,amount,accountNumber,reference });
    if (transfer) {
      return res.status(200).json({ success: false, message: 'Transfer already exists, duplicate transaction detected' })
    };
    // find similar transfer

    const sendMoney = await Transfers.create({
      targetAccount,
      amount,
      accountName,
      accountNumber,
      bankName,
      bankCode,
      SortCode,
      routingNumber,
      ibanNumber,
      reference
    });
    if (!sendMoney) {
      return res.status(404).json({ success: false, message: 'Transfer not created' })
    };

    // Debit account
    client.creditBalance = client.creditBalance - amount;
    const debit = await client.save();
    // add to Transactions
    const transaction = await Transactions.create({
      transactionType: targetAccount,
      transactionStatus: 'Completed',
      amount,
      reference,
      beneficiary: clientId
    });

    return res.status(200).json({ success: true, message: 'Transfer: Success', data: sendMoney })

  } catch (error) {
    return res.status(200).json({ success: false, message: 'Client: Failed' })
  }
}
