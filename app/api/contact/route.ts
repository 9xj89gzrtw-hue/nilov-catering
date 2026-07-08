import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(1),
  date: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ success: false, errors: result.error.flatten().fieldErrors }, { status: 400 });
    }
    console.log("CTA contact form:", result.data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: "Ошибка" }, { status: 400 });
  }
}