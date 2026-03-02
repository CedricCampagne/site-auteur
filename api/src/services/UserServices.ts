import { User, UserCreationAttributes, UserUpdateAttributes } from "../models/User";
import { HttpError } from "../errors/HttpError";
import argon2 from "argon2";
import { UserDto } from "../dto/user/user.dto";

export class UserServices {
    static async getAllUsers(): Promise<UserDto[]>{
        const users = await User.findAll({
            order: ["username"]
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
            attributes: { exclude :["password"] }
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
            throw new HttpError(404, "Chronique introuvable");
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
