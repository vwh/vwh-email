import { NextResponse, type NextRequest } from "next/server";

import { getEmailsForAddress } from "@/database/db";

export async function GET(request: NextRequest) {
  const email = request.nextUrl.pathname.split("/").pop() as string;

  const result = getEmailsForAddress(email);
  if (result.success) return NextResponse.json(result.data);

  return NextResponse.json(
    { error: result.error.message },
    {
      status: 400,
    }
  );
}
