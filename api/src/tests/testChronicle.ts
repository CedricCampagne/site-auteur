import { Chronicle } from "../models/Chronicle";

export async function testChronicle() {
    console.log("--- Test de creation Chronicle");

    const chronicle = await Chronicle.create({
        title: "Ma première chronique",
        content: "Contenu de test",
        published_at: new Date(),
        slug: "ma-premiere-chronique"
    });

    console.log("Chronique crée:",chronicle.toJSON());
}