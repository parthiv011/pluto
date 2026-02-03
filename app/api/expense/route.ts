import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = req.headers.get("user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount, category, date } = body;

    if (typeof amount !== "number" || !category || !date) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const expense = await prisma.expense.create({
      data: {
        userId: userId,
        amount: amount,
        category: category,
        date: date,
      },
    });
    return NextResponse.json({ expense }, { status: 201 });
  } catch (error) {
    console.error("POST /api/expense error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
export async function GET(req: Request) {
  const userId = req.headers.get("user-id");
  if (!userId) {
    return new Response("Missing user-id", { status: 400 });
  }

  const expense = await prisma.expense.findMany({
    where: { userId: userId },
    select: {
      id: true,
      amount: true,
      category: true,
      date: true,
      createdAt: true,
    },
  });

  return NextResponse.json(expense);
}
