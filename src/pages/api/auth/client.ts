// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbcon from '@/models';
import { decodeToken } from '@/utils';
import { getCookie } from 'cookies-next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const { Clients } = await dbcon();

  const token = getCookie('token', { req, res });
  if(!token) return res.status(401).json({success:false, message:"Unauthorized"}); 

  const decoded = decodeToken(token);
  const accid = decoded?.accid;
  try {
    const client = await Clients.findOne({accid}); 
    if (!client) return res.status(404).json({ success:false, message: 'Client not found' });

    return res.status(200).json({ success:true, message: 'Client: Success', data:client   })

  } catch (error) {
    return res.status(500).json({ success:false, message: 'Internal Server Error' });
  }
}
