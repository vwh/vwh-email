import { NextResponse, type NextRequest } from "next/server";

import { getInboxById } from "@/database/db";

export async function GET(request: NextRequest) {
  const inboxId = request.nextUrl.pathname.split("/").pop() as string;

  const result = getInboxById(inboxId);
  if (result.success) {
    if (!result.data)
      return NextResponse.json(
        { error: "Inbox does not exist or has been deleted" },
        { status: 404 }
      );

    return NextResponse.json(result.data);
  }

  return NextResponse.json(
    { error: result.error.message },
    {
      status: 400,
    }
  );
}
