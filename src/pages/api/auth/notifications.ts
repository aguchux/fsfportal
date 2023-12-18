// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbcon from '@/models';
import { passwordify } from '@/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { _id, password } = req.body;
  const { Clients } = await dbcon();
  const hashedPassword = passwordify(password);
  try {
    // update
    const client = await Clients.findOneAndUpdate({_id}, {password: hashedPassword});
    if (!client) {
      return res.status(404).json({ success:false, message: 'Client not found' })
    };
    return res.status(200).json({ success:true, message: 'Update: Success', data:client   })
  } catch (error) {
    return res.status(200).json({ success:false, message: 'Update: Failed'})  
  }
}
