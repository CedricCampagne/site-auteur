import "reflect-metadata";
// attention a charger dotenv avant database.ts sinon env pas reconnu
import dotenv from "dotenv";
dotenv.config();
import { sequelize } from "./config/database";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from 'helmet';
// utilise middleware pour sanitize le req.body automatiquement si présent
import { sanitizeBody } from "./middleware/sanitize";

import { testUserRole } from "./test/testUserRole";
const app = express();
app.use(cors({origin: 'http://localhost:5173', credentials:true}));
app.use(helmet());      // xss-clean n’est plus compatible avec Express 5 / Node 18+ / TypeScript
app.use(express.json());
app.use(cookieParser());
app.use(sanitizeBody);

// Route pour tester le fonctionnement du server
app.get("/api/health", (req , res)=> res.json({status : 'ok'}));

// test de co client sequelize
sequelize.authenticate()
.then(()=> console.log('Connectin a pg via sequelize-ts ok'))
.catch((err=>console.error('Erreur de co a la db', err)));

// test des models User Role et relation via UserRole
// async function main() {
//   await sequelize.sync({ force: true });
//   console.log("Tables synchronisées");

//   await testUserRole();
// }

// main();


app.listen(process.env.PORT, ()=>console.log('API is running on http://localhost:3000'));
