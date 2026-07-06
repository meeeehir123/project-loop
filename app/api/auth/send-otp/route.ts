// @ts-nocheck
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    // Abhi ke liye hum real SMS API integrate nahi kar rahe, bas console par log karenge
    console.log(`Sending dummy OTP '123456' to phone: ${phone}`);

    // Aap chaho toh check kar sakte ho ki user database mein hai ya nahi
    const user = await prisma.user.findUnique({
      where: { phone }
    });

    return NextResponse.json({ 
      success: true, 
      message: "OTP sent successfully (Use 123456)", 
      isNewUser: !user 
    });

  } catch (error) {
    console.error("OTP Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}