// auth.ts
import { serialize, parse } from 'cookie';
import jwt, { Secret } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const secret: Secret = process.env.JWT_SECRET || '';

export function setAuthToken(res: NextApiResponse, token: string) {
  const cookie = serialize('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 604800, // 7 days in seconds
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
}

export function removeAuthToken(res: NextApiResponse) {
  const cookie = serialize('authToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0),
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
}

export function verifyAuthToken(req: NextApiRequest): { userId: string; email: string } | null {
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.authToken;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, secret);
    return decoded as { userId: string; email: string };
  } catch (error) {
    return null;
  }
}