// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbcon, { Client } from '@/models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { clientId } = req.query;
  const { Clients, Transactions } = await dbcon();
  try {

    // COUNT TRANSACTIONS 
    const transactionsCount = await Transactions.countDocuments({ beneficiary: clientId });
    if (transactionsCount > 0) {
      return res.status(200).json({ success: false, message: 'Cannot delete client with transactions' })
    }
  
    // delete where _id and !isAdmin
    const client = await Clients.findOneAndDelete({ _id: clientId, isAdmin: false });
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not deleted' })
    };
    
    return res.status(200).json({ success: true, message: 'Delete: Success', data: client })
  } catch (error) {
    return res.status(200).json({ success: false, message: 'Delete: Failed' })
  }
}
