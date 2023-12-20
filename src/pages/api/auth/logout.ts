import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteCookie } from 'cookies-next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  deleteCookie('token', { req, res });
  return res.status(200).json({ success: true, message: 'Logged out' });
}
