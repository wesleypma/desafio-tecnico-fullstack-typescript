// src/schemas/authSchema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "O e-mail é obrigatório",
      invalid_type_error: "O e-mail deve ser uma string",
    })
    .email("Formato de e-mail inválido")
    .transform((email) =>
      email.normalize("NFKC").trim().toLowerCase().replace(/\s+/g, "")
    ), // Padroniza o email
  password: z
    .string({
      required_error: "A senha é obrigatória",
      invalid_type_error: "A senha deve ser uma string",
    })
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});
