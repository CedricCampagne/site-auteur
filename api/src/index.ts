import "reflect-metadata";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({
    path: `.env.${process.env.NODE_ENV || "development"}`
  });
}

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import mainRouter from "./routes/index.routes";
import { sequelize } from "./config/database";
import { sanitizeBody } from "./middleware/sanitize";
import { errorHandler } from "./middleware/errorHandler";


import { User } from "./models/User";
import { Book } from "./models/Book";
import { Chronicle } from "./models/Chronicle";
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginOpenerPolicy: false
}));

app.use(express.json());
app.use(cookieParser());
app.use(sanitizeBody);

app.use("/api", mainRouter);
app.use(errorHandler);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connection successful");
  } catch (err) {
    console.error("DB connection error:", err);
  }
})();

// test staging 
app.get("/debug", async (req, res) => {
  try {
    const users = await User.findAll();
    const books = await Book.findAll();
    const chronicles = await Chronicle.findAll();
    res.json({ users, books, chronicles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
