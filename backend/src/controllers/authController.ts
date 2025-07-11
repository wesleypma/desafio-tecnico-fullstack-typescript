import { Request, Response, RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema } from "../schemas/authSchema";
import { env } from "../schemas/config";

const prisma = new PrismaClient();

export const login: RequestHandler = async (req: Request, res: Response) => {
  // Valida e padroniza os dados
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      message: "Erro de validação",
      errors: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  const { email, password } = parsed.data;

  try {
    // 1. Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      res.status(401).json({ message: "Credenciais inválidas" });
      return;
    }

    // 2. Compara as senhas
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "Credenciais inválidas" });
      return;
    }

    // 3. Gera token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // 4. Retorna o token
    res.json({ token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
