// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbcon from '@/models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { Transfers } = await dbcon();
  try {
    const {transId} = req.query;
    const transfer = await Transfers.findOne({_id:transId});
    if (!transfer) return res.status(404).json({ success:false, message: 'Transfer not found' });
    return res.status(200).json({ success:true, message: 'Trasfer: Success', data:transfer   })
  } catch (error) {
    return res.status(500).json({ success:false, message: 'Internal Server Error' });
  }
}
