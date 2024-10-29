import { Buffer } from "node:buffer";
import { test } from "node:test";
import assert from "node:assert";

const __SECRET__ = "123";
const __PORT__ = 3000;

const __WEBHOOK__ = `http://localhost:${__PORT__}/webhook`;
const __DUMMY_EMAIL__ = `From: sender1342@example.com
To: recipient@example.com
Subject: Test Email
Content-Type: text/plain

This is a test email body123.
`;

test("Send Dummy Email", async () => {
  const response = await fetch(__WEBHOOK__, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Secret: __SECRET__,
    },
    body: new Uint8Array(Buffer.from(__DUMMY_EMAIL__)),
  });

  assert.strictEqual(response.status, 200);
});

test("Send Invalid Email", async () => {
  const response = await fetch(__WEBHOOK__, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Secret: __SECRET__,
    },
    body: new Uint8Array(Buffer.from("Invalid email")),
  });

  assert.strictEqual(response.status, 400);
});
