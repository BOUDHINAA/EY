import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 });

  const client = await clientPromise;
  const db = client.db('survey');
  const user = await db.collection('users').findOne({ verificationToken: token });
  if (!user) return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });

  await db.collection('users').updateOne(
    { _id: user._id },
    { $set: { isVerified: true }, $unset: { verificationToken: '' } }
  );

  return NextResponse.json({ message: 'Verified' });
}
