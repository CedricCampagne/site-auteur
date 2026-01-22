import { Role } from "../models/Role";
import { rolesData } from "../data/dataRoles";

export async function seedRoles() {
    console.log("=== Seeding Roles ===");
    
        for (const role of rolesData) {
            await Role.create(role);
        }
}