// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SECRET: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    SECRET: process.env.SECRET,
  },
});
