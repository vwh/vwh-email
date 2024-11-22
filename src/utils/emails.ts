import type { ParsedMail, AddressObject } from "mailparser";
import type { SimplifiedEmail, EmailAddress } from "@/types";

// To safely convert AddressObject | AddressObject[] | undefined to EmailAddress
export function convertAddress(
  address: AddressObject | AddressObject[] | undefined
): EmailAddress | null {
  if (!address) return null;

  const addresses = Array.isArray(address) ? address : [address];

  return {
    text: addresses.map((a) => a.text).join(", "),
    html: addresses.map((a) => a.html).join(", "),
    value: addresses
      .flatMap((a) => a.value || [])
      .map((v) => ({
        address: v.address || null,
        name: v.name || null
      }))
  };
}

// To transform ParsedMail to SimplifiedEmail
export function simplifyEmail(email: ParsedMail): SimplifiedEmail {
  return {
    id: email.messageId || "",
    from: convertAddress(email.from),
    to: convertAddress(email.to),
    subject: email.subject || null,
    text: email.text || null,
    html: email.html || null,
    date: email.date || new Date()
    // attachments:
    //   email.attachments?.map((att) => ({
    //     filename: att.filename || null,
    //     contentType: att.contentType || null,
    //     size: att.size,
    //   })) || null,
  };
}
