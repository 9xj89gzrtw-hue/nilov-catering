import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Quote request received:", body);
    return NextResponse.json({ success: true, message: "Заявка получена" });
  } catch {
    return NextResponse.json({ success: false, message: "Ошибка обработки" }, { status: 400 });
  }
}
