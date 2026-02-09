import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/jwt";

const SECRET = process.env.JWT_SECRET || "dev-change-me";

export function generateToken(payload:object) {
    return jwt.sign(payload, SECRET, {
        expiresIn: "1h"
    });
}

export function verifyToken(token:string) : JwtPayload | null {
    try {
        // .verify renvoie le payload ou null si pas ok
        return jwt.verify(token, SECRET) as JwtPayload;
    } catch (error) {
        return null;
    }
}