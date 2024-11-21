import { z } from "zod";

export const addressValueSchema = z.object({
  address: z.string().email().nullable(),
  name: z.string().nullable()
});

export const emailAddressSchema = z.object({
  text: z.string().nullable(),
  html: z.string().nullable(),
  value: z.array(addressValueSchema).nullable()
});

// export const attachmentSchema = z.object({
//   filename: z.string().nullable(),
//   contentType: z.string().nullable(),
//   size: z.number(),
// });

export const emailSchema = z.object({
  id: z.string(),
  from: emailAddressSchema.nullable(),
  to: emailAddressSchema.nullable(),
  cc: emailAddressSchema.nullable(),
  bcc: emailAddressSchema.nullable(),
  subject: z.string().nullable(),
  text: z.string().nullable(),
  html: z.string().nullable(),
  date: z.date().nullable()
  //   attachments: z.array(attachmentSchema).nullable(),
});
