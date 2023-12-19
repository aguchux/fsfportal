// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbcon from '@/models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const { Clients } = await dbcon();
  try {
    const clients = await Clients.find({isAdmin:false}); 
    if (!clients) return res.status(404).json({ success:false, message: 'Clients not found' });

    return res.status(200).json({ success:true, message: 'Clients: Success', data:clients   })

  } catch (error) {
    return res.status(500).json({ success:false, message: 'Internal Server Error' });
  }
}
