// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbcon from '@/models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const {clientId} = req.query;
  const { Clients } = await dbcon();
  try {
    const client = await Clients.findOne({_id:clientId}); 
    if (!client) return res.status(404).json({ success:false, message: 'Client not found' });

    return res.status(200).json({ success:true, message: 'Client: Success', data:client   })

  } catch (error) {
    return res.status(500).json({ success:false, message: 'Internal Server Error' });
  }
}
