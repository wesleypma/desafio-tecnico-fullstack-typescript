import { Router } from "express";
import axios from "axios";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/data", authenticateToken, async (req, res) => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=10"
    );

    res.json({
      user: (req as any).user, // dados do token
      pokemons: response.data.results,
    });
    return;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).json({ message: "Erro ao buscar dados externos" });
    return;
  }
});

export default router;
