import { NextResponse, type NextRequest } from "next/server";

import { getInboxById, deleteInbox } from "@/database/db";

export async function GET(request: NextRequest) {
  const inboxId = request.nextUrl.pathname.split("/").pop() as string;

  const getResult = getInboxById(inboxId);
  if (getResult.success) {
    if (!getResult.data)
      return NextResponse.json(
        { error: "Inbox does not exist or has been deleted already" },
        { status: 404 }
      );

    const deleteResult = deleteInbox(inboxId);
    if (deleteResult.success) return NextResponse.json(true);

    return NextResponse.json(
      { error: deleteResult.error.message },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    { error: getResult.error.message },
    {
      status: 400,
    }
  );
}
