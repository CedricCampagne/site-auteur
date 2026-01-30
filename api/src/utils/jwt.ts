import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev-change-me";

export function generateToken(payload:object) {
    return jwt.sign(payload, SECRET, {
        expiresIn: "1h"
    });
}

export function verifyToken(token:string) {
    try {
        // .verify renvoie le payload ou null si pas ok
        return jwt.verify(token, SECRET);
    } catch (error) {
        return null;
    }
}