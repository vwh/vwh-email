import { NextResponse, type NextRequest } from "next/server";

import { getEmailsForAddress } from "@/database/db";

export async function GET(request: NextRequest) {
  const email = request.nextUrl.pathname.split("/").pop() as string;
  const decodedEmail = decodeURIComponent(email);

  if (!decodedEmail.includes("@"))
    return NextResponse.json(
      { error: "Invalid email address" },
      {
        status: 400
      }
    );

  const result = getEmailsForAddress(decodedEmail);
  if (result.success) return NextResponse.json(result.data);

  return NextResponse.json(
    { error: result.error.message },
    {
      status: 400
    }
  );
}
