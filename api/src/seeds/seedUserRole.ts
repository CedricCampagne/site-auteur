import { User } from "../models/User";
import { Role } from "../models/Role";
import { UserRole } from "../models/UserRole";

export async function seedUserRole() {
    console.log("=== Seeding UserRole ===");
    const cedric = await User.findOne({ where: { email: "ced.campagne@gmail.com" }});
    const adminRole = await Role.findOne({ where: { name: "admin" }});
    const userRole = await Role.findOne({ where: { name: "user" }});
    
    if (!cedric) throw new Error("User cedric not found");
    if (!adminRole) throw new Error("Role admin not found");
    if (!userRole) throw new Error("Role user not found");

    await UserRole.create({
      id_user: cedric.id_user,
      id_role: adminRole?.id_role
    });
    
    await UserRole.create({
      id_user: cedric.id_user,
      id_role: userRole?.id_role
    });

}
