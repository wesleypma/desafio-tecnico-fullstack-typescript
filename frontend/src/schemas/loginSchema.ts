import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Formato do E-mail inválido")
    .transform((email) => email.toLowerCase().trim()),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

// Tipagem derivada (útil para forms)
export type LoginFormData = z.infer<typeof loginSchema>;
