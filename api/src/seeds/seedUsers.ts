import { User } from "../models/User";
import { getUsersData } from "../data/dataUsers.ts";

export async function seedUsers() {
     console.log("=== Seeding Users ===");
    const users = await getUsersData();

    for (const u of users) {
        await User.create(u);
    }
}
