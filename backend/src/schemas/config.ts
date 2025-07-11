// src/config.ts
import dotenv from "dotenv";
import { envSchema } from "../schemas/envSchema";

dotenv.config();

// Adicione esta verificação para debug
console.log("Variáveis carregadas:", {
  DATABASE_URL: process.env.DATABASE_URL !== undefined,
  JWT_SECRET: process.env.JWT_SECRET !== undefined,
  NODE_ENV: process.env.NODE_ENV,
});

export const env = envSchema.parse(process.env);
