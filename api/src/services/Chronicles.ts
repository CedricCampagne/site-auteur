import { sequelize } from "../config/database";
import { Chronicle } from "../models/Chronicle";

export class ChronicleService {
    static async getAllChronicles() {
            return Chronicle.findAll();
        }
    
    static async getRandom3Chronicles() {
        return Chronicle.findAll({
            order: sequelize.literal('RANDOM()'),
            limit: 3
        })
    }

    static async getLatest3tChronicles() {
        return Chronicle.findAll({
            order: [["published_at", "DESC"]],
            limit: 3
        })
    }

    static async getBySlug(slug: string) {
        return Chronicle.findOne({
            where: { slug }
        });
    }

    static async getById(id:number) {
        return Chronicle.findByPk(id);
    }
}