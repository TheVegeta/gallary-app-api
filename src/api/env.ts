import "dotenv/config";
import { parseEnv } from "znv";
import { z } from "zod";

export const { PORT, DB_CONNECTION, JWT_SECRET } = parseEnv(process.env, {
  PORT: z.string().min(1),
  DB_CONNECTION: z.string().min(1),
  JWT_SECRET: z.string().min(1),
});
