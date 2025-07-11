import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import dataRoutes from "./routes/dataRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", dataRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
