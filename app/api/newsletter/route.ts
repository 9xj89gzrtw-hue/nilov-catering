import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = z.string().email().safeParse(body.email);
    if (!result.success) {
      return NextResponse.json({ success: false, message: "Некорректный email" }, { status: 400 });
    }
    console.log("Newsletter:", body.email);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: "Ошибка" }, { status: 400 });
  }
}
