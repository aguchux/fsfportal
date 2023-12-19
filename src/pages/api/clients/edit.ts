// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbcon, { Client } from '@/models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { clientId } = req.query;
  const {
    accid,
    password,
    title,
    gender,
    firstName,
    middleName,
    lastName,
    birthDay,
    email,
    phone,
    address,
    city,
    zipcode,
    state,
    country,
    accountType,
    accountCurrency,
    idType,
    idNumber,
    idExpiry,
    swiftCode,
    sortCode,
    routingNumber,
    ibanNumber,
    disabled,
    transferCodeEnabled,
    transferCodeTitle,
    transferCode,
    transferCodeMode,
    transferCodeDescription
  }: Client = req.body;

  const { Clients } = await dbcon();
  try {
    // update
    const client = await Clients.findOneAndUpdate(
      { _id: clientId },
      {
        accid,
        password,
        title,
        gender,
        firstName,
        middleName,
        lastName,
        birthDay,
        email,
        phone,
        address,
        city,
        zipcode,
        state,
        country,
        accountType,
        accountCurrency,
        idType,
        idNumber,
        idExpiry,
        swiftCode,
        sortCode,
        routingNumber,
        ibanNumber,
        disabled,
        transferCodeEnabled,
        transferCodeTitle,
        transferCode,
        transferCodeMode,
        transferCodeDescription
      }
    );
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not updated' })
    };
    return res.status(200).json({ success: true, message: 'Update: Success', data: client })
  } catch (error) {
    return res.status(200).json({ success: false, message: 'Update: Failed' })
  }
}
