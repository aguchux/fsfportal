// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbcon, { Client } from '@/models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { _id, firstName, middleName, lastName, email, phone, address, city, zipcode, state, country } = req.body;
  const { Clients } = await dbcon();
  try {
    // update
    const client = await Clients.findOneAndUpdate({_id}, {firstName, middleName, lastName, email, phone, address, city, zipcode, state, country});
    if (!client) {
      return res.status(404).json({ success:false, message: 'Client not found' })
    };
    return res.status(200).json({ success:true, message: 'Update: Success', data:client   })
  } catch (error) {
    return res.status(200).json({ success:false, message: 'Update: Failed'})  
  }
}
