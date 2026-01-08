import { Sequelize } from "sequelize-typescript";
// Tu importes la fonction join du module Node.js  path.
// Elle sert à construire des chemins de fichiers compatibles Windows / Mac / Linux.
import { join } from "path";

export const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT as 'postgres',
    host: process.env.DB_HOST, database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: false, models: [join(__dirname, '..', 'models')]
});
