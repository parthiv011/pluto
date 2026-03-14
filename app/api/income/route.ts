import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = req.headers.get('user-id');

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      amount,
      source,
      customSource,
      platform,
      brandName,
      description,
      recievedAt,
    } = body;

    if (typeof amount !== 'number' || !source || !recievedAt) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }
    if (source === 'OTHER' && !customSource) {
      throw new Error('Custom source is required when source is OTHER');
    }

    const income = await prisma.income.create({
      data: {
        userId: userId,
        amount: amount,
        source: source,
        customSource: source === 'OTHER' ? customSource : null,
        platform: platform,
        brandName: brandName,
        description: description,
        receivedAt: new Date(recievedAt),
      },
    });

    return NextResponse.json({ income }, { status: 201 });
  } catch (error) {
    console.error('POST /api/income error:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
