import type { NextApiRequest, NextApiResponse } from 'next'
import dbcon, { Client } from '@/models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { firstName, middleName, lastName, email, phone } = req.body;
  const { Clients } = await dbcon();
  try {
    const client = await Clients.create({firstName, middleName, lastName, email, phone});
    if (!client) {
      return res.status(404).json({ success:false, message: 'Client not created' })
    };
    return res.status(200).json({ success:true, message: 'Client: Success', data:client   })
  } catch (error) {
    return res.status(200).json({ success:false, message: 'Client: Failed'})  
  }
}