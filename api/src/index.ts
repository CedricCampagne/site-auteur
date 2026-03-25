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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
