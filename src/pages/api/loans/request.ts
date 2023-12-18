// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbcon from '@/models';
import { getClientId } from '@/utils';
import { getCookie } from 'cookies-next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const {amount, rate} = req.body;
  const { Loans } = await dbcon();

  const token = getCookie('token', { req, res });

  if(!token) return res.status(401).json({success:false, message:"Unauthorized"}); 
  const clientId = getClientId(token);

  if(!clientId) return res.status(401).json({success:false, message:"Unauthorized"});
  try {

    const loan = await Loans.create({
      amount,
      rate,
      client: clientId
    }); 
    if (!loan) return res.status(404).json({ success:false, message: 'Loan not found' });
    return res.status(200).json({ success:true, message: 'Loan: Success', data:loan   })

  } catch (error) {
    return res.status(500).json({ success:false, message: 'Internal Server Error' });
  }
}
