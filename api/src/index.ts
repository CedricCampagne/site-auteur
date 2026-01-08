import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from 'helmet';
import dotenv from "dotenv";
// utilise middleware pour sanitize le req.body automatiquement si présent
import { sanitizeBody } from "./middleware/sanitize";
dotenv.config();

const app = express();
app.use(cors({origin: 'http://localhost:5173', credentials:true}));
app.use(helmet());      // xss-clean n’est plus compatible avec Express 5 / Node 18+ / TypeScript
app.use(express.json());
app.use(cookieParser());
app.use(sanitizeBody);

// Route pour tester le fonctionnement du server
app.get("/api/health", (req , res)=> res.json({status : 'ok'}));

app.listen(3000, ()=>console.log('API is running on http://localhost:3000'));
