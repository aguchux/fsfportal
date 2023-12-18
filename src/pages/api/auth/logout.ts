import type { NextApiRequest, NextApiResponse } from 'next'
import { hasCookie, deleteCookie } from 'cookies-next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const has_cookie = hasCookie('token', { req, res });
  if (!has_cookie) {
      return res.status(200).json({ success: true, message: "Logged out already" });
  }
  deleteCookie('token', { req, res });
  return res.status(200).json({ success: true, message: 'Logged out' });
}
