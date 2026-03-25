import "reflect-metadata";
import dotenv from "dotenv"; dotenv.config();

import { sequelize } from "../config/database";
import { seedBooks } from "./seedBooks";
import { seedChronicles } from "./seedChronicles";
import { seedRoles } from "./seedRoles";
import { seedUsers } from "./seedUsers";
import { seedUserRole } from "./seedUserRole";
import { seedComments } from "./seedComments";

async function runSeed() {
    console.log("=== Running Seed ===");

    try {
        await sequelize.authenticate();
        console.log('Connection DB ok');

        // En prod on ne fais jamais sync
        // await sequelize.sync({ force: true});
        // console.log('Tables synchronisées');

        await seedBooks();
        await seedChronicles();
        await seedRoles();
        await seedUsers();
        await seedUserRole();
        
        console.log('Seed Terminé !!');
    } catch (error) {
        console.error('Erreru pendant le seed :', error);
    }finally {
        process.exit(0);
    }
}

runSeed();