import Database from "better-sqlite3";
import cuid from "cuid";

import { SQL_STATEMENTS } from "./statements";

import type { DatabaseEmails, Result, SimplifiedEmail } from "@/types";
import type { DatabaseInbox } from "@/types";

const db = new Database("mail.db");

db.exec(SQL_STATEMENTS.PRAGMA);
db.exec(SQL_STATEMENTS.CREATE_TABLES);
db.exec(SQL_STATEMENTS.CREATE_INDEX);

setInterval(() => {
  try {
    db.exec(SQL_STATEMENTS.DELETE_EXPIRED_ENTRIES);
  } catch (error) {
    console.error(error);
  }
}, 1000 * 60 * 60 * 2);

export function insertEmail(
  emailData: SimplifiedEmail
): Result<number | bigint> {
  try {
    const emailId = db
      .prepare(SQL_STATEMENTS.INSERT_EMAIL)
      .run(
        emailData.subject,
        Date.now() + 3 * 24 * 60 * 60 * 1000
      ).lastInsertRowid;

    // Prepare insert statements for performance
    const insertAddress = db.prepare(SQL_STATEMENTS.INSERT_EMAIL_ADDRESS);
    const insertInbox = db.prepare(SQL_STATEMENTS.INSERT_INBOX);

    // Insert email addresses
    const recipientGroups = [
      { type: "from", values: emailData.from?.value || [] },
      { type: "to", values: emailData.to?.value || [] },
      { type: "cc", values: emailData.cc?.value || [] },
      { type: "bcc", values: emailData.bcc?.value || [] },
    ];

    for (const { type, values } of recipientGroups) {
      db.transaction(() => {
        for (const recipient of values) {
          insertAddress.run(emailId, type, recipient.address);
        }
      })();
    }

    // Insert inbox entries
    const allRecipients = [
      ...(emailData.to?.value || []),
      ...(emailData.cc?.value || []),
      ...(emailData.bcc?.value || []),
    ];

    for (const recipient of allRecipients) {
      const type = emailData.to?.value?.includes(recipient)
        ? "to"
        : emailData.cc?.value?.includes(recipient)
        ? "cc"
        : "bcc";

      insertInbox.run(
        cuid(),
        emailId,
        recipient.address,
        type,
        emailData.text ?? null,
        emailData.html ?? null
      );
    }

    return { success: true, data: emailId };
  } catch (error) {
    if (error instanceof Error) return { success: false, error };
    return { success: false, error: new Error("Unknown error") };
  }
}

export function getEmailsForAddress(address: string): Result<DatabaseEmails> {
  try {
    const emails = db
      .prepare(SQL_STATEMENTS.GET_EMAILS_FOR_ADDRESS)
      .all(address) as DatabaseEmails;

    return { success: true, data: emails };
  } catch (error) {
    if (error instanceof Error) return { success: false, error };

    return { success: false, error: new Error("Unknown error") };
  }
}

export function getInboxById(inboxId: string): Result<DatabaseInbox> {
  try {
    const inbox = db
      .prepare(SQL_STATEMENTS.GET_INBOX_BY_ID)
      .get(inboxId) as DatabaseInbox;

    return { success: true, data: inbox };
  } catch (error) {
    if (error instanceof Error) return { success: false, error };
    return { success: false, error: new Error("Unknown error") };
  }
}
