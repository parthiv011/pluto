import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const body = await req.json();

  const username = body.username as string;
  const password = body.password as string;

  if (!username || !password) {
    return NextResponse.json({ msg: 'Please enter an email' }, { status: 400 });
  }

  const checkUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (checkUser) {
    return NextResponse.json({ msg: 'User already exists' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
    },
    select: {
      id: true,
      username: true,
    },
  });

  return NextResponse.json(
    { msg: 'User created successfully', user },
    { status: 201 }
  );
}
