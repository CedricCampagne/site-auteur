import { Chronicle } from "../models/Chronicle";
import { chroniclesData } from "../data/dataChronicles";

export async function seedChronicles() {
    console.log("=== Seeding Chronicles ===");

    for( const chronicle of chroniclesData) {
        await Chronicle.create(chronicle);
    }
}