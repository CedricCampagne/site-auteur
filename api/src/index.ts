import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import mainRouter from "./routes/index.routes";
import { sequelize } from "./config/database";
import { sanitizeBody } from "./middleware/sanitize";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(helmet({ crossOriginResourcePolicy: false, crossOriginOpenerPolicy: false }));
app.use(express.json());
app.use(cookieParser());
app.use(sanitizeBody);

// Test connexion DB
sequelize.authenticate()
  .then(() => console.log("Connection to Supabase Postgres OK"))
  .catch(err => console.error("DB connection error:", err));

app.use("/api", mainRouter);
app.use(errorHandler);

// Port dynamique Render ou fallback local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));