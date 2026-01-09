import { Role } from "../models/Role";
import { User } from "../models/User";

export async function testUserRole() {
    console.log("=== Test creation et relation user et role ===");

    // console.log(Role.getAttributes());

    const role = await Role.create({ name: "admin" });
    console.log("Role créé :", role.toJSON());

    const user = await User.create({
        username: "katia",
        email: "katia@test.com",
        password: "hash",
        is_active: true
    });
    console.log("User créé :", user.toJSON());

    await user.$add("role", role);

    const userWithRoles = await User.findByPk(user.id_user, {
        include: [Role]
    });

    console.log("User avec roles :", JSON.stringify(userWithRoles, null, 2));
}
