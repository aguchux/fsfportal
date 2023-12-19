import type { NextApiRequest, NextApiResponse } from 'next'
import dbcon from '@/models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const data = req.body;
  const { Clients } = await dbcon();
  try {
    const client = await Clients.create(data);
    if (!client) {
      return res.status(404).json({ success:false, message: 'Client not created' })
    };
    return res.status(200).json({ success:true, message: 'Client: Success', data:client   })
  } catch (error) {
    return res.status(200).json({ success:false, message: 'Client: Failed'})  
  }
}