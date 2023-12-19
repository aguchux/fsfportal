// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbcon from '@/models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { Transactions } = await dbcon();
  try {
    const {clientId} = req.query;
    let transactions;
     if (!clientId) {
      transactions = await Transactions.find();
      if (!transactions) return res.status(404).json({ success:false, message: 'Transactions not found' });
      return res.status(200).json({ success:true, message: 'Transactions: Success', data:transactions   })
     }
     transactions = await Transactions.find({beneficiary:clientId}); 
    if (!transactions) return res.status(404).json({ success:false, message: 'Transactions not found' });
    return res.status(200).json({ success:true, message: 'Transactions: Success', data:transactions   })

  } catch (error) {
    return res.status(500).json({ success:false, message: 'Internal Server Error' });
  }
}
