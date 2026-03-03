import { User, UserCreationAttributes, UserUpdateAttributes } from "../models/User";
import { HttpError } from "../errors/HttpError";
import argon2 from "argon2";
import { Role } from "../models/Role";
import { UserDto } from "../dto/user/user.dto";

export class UserServices {
    static async getAllUsers(): Promise<UserDto[]>{
        const users = await User.findAll({
            order: ["username"],
            include: [{ model: Role, attributes: ["id_role", "name"] }]
        });

        return users.map(user => ({
            id_user: user.id_user,
            username: user.username,
            email: user.email,
            is_active: user.is_active,
            created_at: user.created_at.toISOString(),
            updated_at: user.updated_at.toISOString(),
            roles: user.roles?.map(role => ({ id_role: role.id_role, name: role.name }))
    }));
    }

    static async getUserById(id: number): Promise<UserDto>{
        const user = await User.findByPk(id, {
            attributes: { exclude :["password"] },
            include: [{ model: Role, attributes: ["id_role", "name"] }]
        });

        if(!user) {
            throw new HttpError(404, "Aucun utilisateur trouvé avec cet ID");
        }

        return {
            id_user: user.id_user,
            username: user.username,
            email: user.email,
            is_active: user.is_active,
            created_at: user.created_at.toISOString(),
            updated_at: user.updated_at.toISOString(),
            roles: user.roles?.map(role => ({ id_role: role.id_role, name: role.name }))
        };
    }

    static async deleteUser(id: number): Promise<number>{
        const deleted = await User.destroy({ where: {id_user: id}});

        if (deleted === 0) {
            throw new HttpError(404, "Utilisateur introuvable");
        }
        return deleted;
    }

    static async createUser(data: UserCreationAttributes): Promise<UserDto>{
        const hash = await argon2.hash(data.password);

        const user = await User.create({
            username: data.username,
            email: data.email,
            password: hash,
            is_active: data.is_active
        })

        if (!user) {
            throw new HttpError(400, "Impossible de créer l'utilisateur");
        }

        const fullUser = await User.findByPk((user.id_user), {
            include: [
                {
                    model: Role,
                    attributes: ["id_role", "name"]
                }
            ]
        });

        if(!fullUser){
            throw new HttpError(500, "Erreur lors de la récupération de l'utilisateur créé");
        }

        return {
            id_user: fullUser.id_user,
            username: fullUser.username,
            email: fullUser.email,
            is_active: fullUser.is_active,
            created_at: fullUser.created_at.toISOString(),
            updated_at: fullUser.updated_at.toISOString(),
            roles: fullUser.roles?.map(role => ({ id_role: role.id_role, name: role.name }))
        };
    }

    static async updateUser(id: number, data:UserUpdateAttributes): Promise<UserDto> {
        const user = await User.findOne({ 
                where: { id_user: id }
            });
            
            if (!user) {
                throw new HttpError(404, "Aucune utilisateur trouvé");
            }     

            // Si un password est fourni → re-hash
            if (data.password && data.password.trim() !== ""){
                data.password = await argon2.hash(data.password);
            } else {
                delete data.password;
            }

            await user.update(data);     
            return {
                id_user: user.id_user,
                username: user.username,
                email: user.email,
                is_active: user.is_active,
                created_at: user.created_at.toISOString(),
                updated_at: user.updated_at.toISOString(),
                roles: user.roles?.map(role => ({ id_role: role.id_role, name: role.name }))
            };
    }

    static async toggleUser(id:number): Promise<UserDto>{
        const user = await User.findOne({
            where: { id_user: id}
        });

        if (!user) {
            throw new HttpError(404, "Aucune User trouvé");
        }

        user.is_active = !user.is_active;
        await user.save();

        return {
            id_user: user.id_user,
            username: user.username,
            email: user.email,
            is_active: user.is_active,
            created_at: user.created_at.toISOString(),
            updated_at: user.updated_at.toISOString(),
            roles: user.roles?.map(role => ({ id_role: role.id_role, name: role.name }))
        };
    }
}
