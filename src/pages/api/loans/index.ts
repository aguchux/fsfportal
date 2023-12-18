// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbcon from '@/models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const { Loans } = await dbcon();
  try {
    const loans = await Loans.find({}); 
    if (!loans) return res.status(404).json({ success:false, message: 'Loans not found' });

    return res.status(200).json({ success:true, message: 'Loans: Success', data:loans   })

  } catch (error) {
    return res.status(500).json({ success:false, message: 'Internal Server Error' });
  }
}
