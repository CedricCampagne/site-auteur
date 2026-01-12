import "reflect-metadata";
import dotenv from "dotenv"; dotenv.config();

import { sequelize } from "../config/database";
import { seedBooks } from "./seedBooks";

async function runSeed() {
    console.log("=== Running Seed ===");

    try {
        await sequelize.authenticate();
        console.log('Connection DB ok');

        await sequelize.sync({ force: true});
        console.log('Tables synchronisées');

        await seedBooks();
        console.log('Seed Terminé !!');
    } catch (error) {
        console.error('Erreru pendant le seed :', error);
    }finally {
        process.exit(0);
    }
}

runSeed();