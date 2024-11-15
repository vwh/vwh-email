import { NextResponse, type NextRequest } from "next/server";
import { Buffer } from "node:buffer";

import { simpleParser } from "mailparser";
import { simplifyEmail } from "@/utils/emails";
import { emailSchema } from "@/utils/zod";
import { insertEmail } from "@/database/db";

import { env } from "@/env.mjs";

export async function POST(request: NextRequest) {
  if (request.headers.get("Secret") !== env.SECRET)
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });

  const body = await request.arrayBuffer();
  const buffer = Buffer.from(body);

  const parsedEmail = await simpleParser(buffer);
  const simplifiedEmail = simplifyEmail(parsedEmail);

  const emailValidationResult = emailSchema.safeParse(simplifiedEmail);
  if (!emailValidationResult.success)
    return NextResponse.json(emailValidationResult.error.issues, {
      status: 400,
    });

  if (!simplifiedEmail.to)
    return NextResponse.json(
      { error: "Missing recipient" },
      {
        status: 400,
      }
    );

  insertEmail(simplifiedEmail);

  return NextResponse.json("OK");
}
