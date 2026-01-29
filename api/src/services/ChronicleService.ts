import { sequelize } from "../config/database";
import { Chronicle } from "../models/Chronicle";
import { HttpError } from "../errors/HttpError";

export class ChronicleService {
    static async getAllChronicles() {
        const chronicles= await Chronicle.findAll();

        if(!chronicles || chronicles.length === 0) {
            // throw { status: 404, message: "Aucune chronique trouvée" };
            throw new HttpError(404, "Aucune chronique trouvée");
        }
        return chronicles;
    }
       
    static async getRandom3Chronicles() {
        const chronicles= await Chronicle.findAll({
            order: sequelize.literal('RANDOM()'),
            limit: 3
        })
        if(!chronicles || chronicles.length === 0) {
            // throw { status: 404, message: "Aucune chronique trouvée" };
            throw new HttpError(404, "Aucune chronique trouvée");
        }
        return chronicles;
    }

    static async getLatest3Chronicles() {
        const chronicles= await Chronicle.findAll({
            order: [["published_at", "DESC"]],
            limit: 3
        })
        if(!chronicles || chronicles.length === 0) {
            // throw { status: 404, message: "Aucune chronique trouvée" };
            throw new HttpError(404, "Aucune chronique trouvée");
        }
        return chronicles;
    }

    static async getBySlug(slug: string) {
        const chronicle= await Chronicle.findOne({
            where: { slug }
        })
        if(!chronicle) {
            // throw { status: 404, message: "Aucune chronique trouvée avec ce slug" };
            throw new HttpError(404, "Aucune chronique trouvée avec ce slug");
        }
        return chronicle;
    }

    static async getById(id:number) {
        const chronicle= await Chronicle.findByPk(id);
        if(!chronicle) {
            // throw { status: 404, message: "Aucune chronique trouvée avec cet ID" };
            throw new HttpError(404, "Aucune chronique trouvée avec cet ID");
        }
        return chronicle;
    }
}