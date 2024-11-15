import Database from "better-sqlite3";
import cuid from "cuid";

import { SQL_STATEMENTS } from "./statements";

import type { DatabaseEmails, SimplifiedEmail } from "@/types";
import type { DatabaseInbox } from "@/types";

const db = new Database("mail.db");

db.exec(SQL_STATEMENTS.PRAGMA);
db.exec(SQL_STATEMENTS.CREATE_TABLES);

setInterval(() => {
  db.exec(SQL_STATEMENTS.deleteExpiredEntries);
}, 1000 * 60 * 60 * 2);

export function insertEmail(emailData: SimplifiedEmail) {
  // Insert email into Email table
  const emailId = db
    .prepare(SQL_STATEMENTS.insertEmail)
    .run(
      emailData.subject,
      Date.now() + 3 * 24 * 60 * 60 * 1000
    ).lastInsertRowid;

  // Insert email addresses into EmailAddress table
  for (const { type, values } of [
    { type: "from", values: emailData.from?.value || [] },
    { type: "to", values: emailData.to?.value || [] },
    { type: "cc", values: emailData.cc?.value || [] },
    { type: "bcc", values: emailData.bcc?.value || [] },
  ]) {
    for (const recipient of values) {
      db.prepare(SQL_STATEMENTS.insertEmailAddress).run(
        emailId,
        type,
        recipient.address
      );
    }
  }

  // Insert inbox entry for each recipient with body content
  for (const recipient of [
    ...(emailData.to?.value || []),
    ...(emailData.cc?.value || []),
    ...(emailData.bcc?.value || []),
  ]) {
    const inboxId = cuid();
    const type = emailData.to?.value?.includes(recipient)
      ? "to"
      : emailData.cc?.value?.includes(recipient)
      ? "cc"
      : "bcc";

    db.prepare(SQL_STATEMENTS.insertInbox).run(
      inboxId,
      emailId,
      recipient.address,
      type,
      emailData.text ?? null,
      emailData.html ?? null
    );
  }

  return emailId;
}

export function getEmailsForAddress(address: string) {
  return db
    .prepare(SQL_STATEMENTS.getEmailsForAddress)
    .all(address) as DatabaseEmails;
}

export function getInboxById(inboxId: string) {
  return db.prepare(SQL_STATEMENTS.getInboxById).get(inboxId) as DatabaseInbox;
}
