import { User } from "../models/User";
import { Role } from "../models/Role";
import { AuthResult, LoginParams, RegisterParams } from "../types/auth";
import { hashPassword, verifyPassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { HttpError } from "../errors/HttpError";

export class AuthServices {
    static async registerUser(params: RegisterParams) {

        // Vérification du mail
        const existingEmail = await User.findOne({where: {email: params.email}});
        if(existingEmail) {
            // throw new Error("Email déjà utilsié");
            throw new HttpError(409, "Email déjà utilsié")
        }

        // Vérification du username
        const existingUsername = await User.findOne({where: {username: params.username}});
        if(existingUsername) {
            // throw new Error("Nom d'utilisateur déjà utilsié");
            throw new HttpError(409, "Nom d'utilisateur déjà utilisé");
        }

        // Hash du pass
        const hashed = await hashPassword(params.password);

        // Création du user
        const user = await User.create({
            username: params.username,
            email: params.email,
            password: hashed,
            is_active: true
        });

        const roleUser = await Role.findOne({where: {name: "user"}});
        if (!roleUser) { 
            // throw new Error("Le rôle 'user' n'existe pas"); 
            throw new HttpError(500, "Le rôle 'user' n'existe pas");
        }
        await user.$add("roles", roleUser.id_role);

        //Génération du token
        const token = generateToken({
            id: user.id_user,
            email: user.email,
            username: user.username,
            roles: ["user"]
        });

        return {
            user: {
                id: user.id_user,
                email: user.email,
                username: user.username,
                roles: ["user"]
            },
            token
        };
    }

    static async loginUser(params: LoginParams): Promise<AuthResult> {
        const user = await User.findOne({
            where : {email: params.email},
            include : [Role]
        });
        if (!user) {
            // throw new Error("Email ou mot de pass invalide");
            throw new HttpError(401, "Email ou mot de passe invalide");
        }

        if( user.is_active === false) {
            // throw new Error("Compte bloqué");
            throw new HttpError(403, "Compte bloqué");
        }

        const valid = await verifyPassword( user.password, params.password);
        if(!valid) {
            // throw new Error("Email ou mot de pass invalide");
            throw new HttpError(401, "Email ou mot de passe invalide");
        }

        const roles = user.roles.map(r =>r.name);
        
        //Génération du token
        const token = generateToken({
            id: user.id_user,
            email: user.email,
            username: user.username,
            roles
        });

        return {
            user: {
                id: user.id_user,
                email: user.email,
                username: user.username,
                roles
            },
            token
        };
    }
}