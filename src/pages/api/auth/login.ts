// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbcon, { Client } from '@/models';
import { signToken } from '@/utils';
import { setCookie } from 'cookies-next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { accid,password } = req.body;
  const { Clients } = await dbcon();
  try {
    const client = await Clients.findOne({accid:accid});

    if(!client) return res.status(400).json({success:false, message:"Invalid username or password"});    
    const isPasswordVerified = Boolean(password === client.password);
    if(!isPasswordVerified) return res.status(400).json({success:false, message:"Invalid username or password"});

    const payload = {
        _id: client._id,
        accid: client.accid,
        isAdmin: client.isAdmin,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phone: client.phone,
    }

    const token = signToken(payload as any);
    setCookie('token', token, { req, res, maxAge: 600, path: '/', secure: process.env.NODE_ENV !== 'development', sameSite: 'strict' });
    
    return res.status(200).json({ success:true, message: 'Login: Success', data:token   })
  } catch (error) {
    return res.status(200).json({ success:false, message: 'Login: Failed'})  
  }
}
