import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = req.headers.get('user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { amount, category, date } = body;

    if (typeof amount !== 'number' || !category || !date) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const expense = await prisma.expense.create({
      data: {
        userId: userId,
        amount: amount,
        category: category,
        date: new Date(date),
      },
    });
    return NextResponse.json({ expense }, { status: 201 });
  } catch (error) {
    console.error('POST /api/expense error:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const userId = req.headers.get('user-id');

    if (!userId) {
      return NextResponse.json({ message: 'Missing user-id' }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);

    const page = Math.max(Number(searchParams.get('page') ?? 1), 1);

    const pageSize = Math.min(
      Math.max(Number(searchParams.get('pageSize') ?? 10), 1),
      100
    );

    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const search = searchParams.get('search');
    const sortby = searchParams.get('sortBy') ?? 'createAt';
    const order = searchParams.get('order') === 'asc' ? 'asc' : 'desc';

    const skip = (page - 1) * pageSize;

    const where: any = {
      userId,
    };
    //date filter
    if (from && to) {
      const start = new Date(from);
      start.setHours(0, 0, 0, 0);

      const end = new Date(to);
      end.setHours(23, 59, 59, 999);

      where.date = {
        gte: start,
        lte: end,
      };
    }

    //search filter
    if (search) {
      where.category = {
        contains: search,
        mode: 'insensitive',
      };
    }

    // console.log(where);
    const [data, total] = await Promise.all([
      prisma.expense.findMany({
        where: where,
        skip: skip,
        take: pageSize,
        orderBy: { [sortby]: order },
        select: {
          id: true,
          amount: true,
          category: true,
          date: true,
          createdAt: true,
        },
      }),
      prisma.expense.count({
        where: { userId },
      }),
    ]);

    const totalPages = Math.ceil(total / pageSize);
    return NextResponse.json({ data, total, page, pageSize, totalPages });
  } catch (error) {
    console.error('GET /expense error:', error);

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
