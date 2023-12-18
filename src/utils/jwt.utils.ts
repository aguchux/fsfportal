import { Client } from '@/models';
import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import { Schema } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'

type IReq = {
    req: NextApiRequest;
    res: NextApiResponse;
}

const jwt_secret = process.env.JWT_SECRET || 'secret';
const jwt_expiration_time = process.env.JWT_EXPIRATION_TIME || '1h';

export const getAccid = (token: string):string => {
    const decoded = decodeToken(token); 
    const accid = decoded?.accid;
    return accid;
}

export const getClientId = (token: string):Schema.Types.ObjectId => {
    const decoded = decodeToken(token); 
    const id = decoded?._id;
    return id as Schema.Types.ObjectId;
}



export const signToken = (payload: Client) => {
    return jwt.sign(payload, jwt_secret, {
        expiresIn: jwt_expiration_time,
    });
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, jwt_secret);
}

export const decodeToken = (token: string):Client => {
    return jwt.decode(token) as Client;
}

export const getTokenFromHeaders = (req: any):string => {
    const token = req.headers.authorization?.split(' ')[1];
    return token;
}

export const verifyTokenMiddleware = (req: any, res: any, next: any) => {
    const token = getTokenFromHeaders(req);
    if(!token) return res.status(401).json({success:false, message:"Unauthorized"});
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({success:false, message:"Unauthorized"});
    }
}