import { User, UserCreationAttributes, UserUpdateAttributes } from "../models/User";
import { HttpError } from "../errors/HttpError";
import argon2 from "argon2";

export class UserServices {
    static async getAllUsers(){
        const users = await User.findAll({
            order: ["username"]
        });

        return users;
    }

    static async getUserById(id: number){
        const user = await User.findByPk(id, {
            attributes: { exclude :["password"] }
        });

        if(!user) {
            throw new HttpError(404, "Aucun utilisateur trouvé avec cet ID");
        }

        return user;
    }

    static async deleteUser(id: number){
        return User.destroy({ where: {id_user: id}});
    }

    static async createUser(data: UserCreationAttributes){
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

        return user;
    }

    static async updateUser(id: number, data:UserUpdateAttributes) {
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
                return user;
    }

    static async toggleUser(id:number){
            const user = await User.findOne({
                where: { id_user: id}
            });
    
            if (!user) {
                throw new HttpError(404, "Aucune User trouvé");
            }
    
            user.is_active = !user.is_active;
            await user.save();
    
            return user;
        }
}
