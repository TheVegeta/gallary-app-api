import "dotenv/config";
import { parseEnv } from "znv";
import { z } from "zod";

export const { PORT, DB_NAME, DB_PASSWORD, DB_USERNAME, JWT_SECRET } = parseEnv(
  process.env,
  {
    PORT: z.string().min(1),
    DB_NAME: z.string().min(1),
    DB_USERNAME: z.string().min(1),
    DB_PASSWORD: z.string().min(1),
    JWT_SECRET: z.string().min(1),
  }
);
