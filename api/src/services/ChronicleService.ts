import { sequelize } from "../config/database";
import { Chronicle } from "../models/Chronicle";
import { HttpError } from "../errors/HttpError";

export class ChronicleService {
    static async getAllChronicles(isAdmin: boolean ) {
        const where = isAdmin ? {} : { is_active:true };
        const chronicles= await Chronicle.findAll({
            where,
            order: [["published_at", "DESC"]]
        });

        if(!chronicles || chronicles.length === 0) {
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
            throw new HttpError(404, "Aucune chronique trouvée");
        }
        return chronicles;
    }

    static async getBySlug(slug: string) {
        const chronicle= await Chronicle.findOne({
            where: { slug }
        })
        if(!chronicle) {
            throw new HttpError(404, "Aucune chronique trouvée avec ce slug");
        }
        return chronicle;
    }

    static async getChroniclesById(id:number, isAdmin: boolean =false) {
        
        const where : Partial<Chronicle>= isAdmin
            ? { id_chronicle : id}
            : { id_chronicle: id, is_active: true};

        const chronicle= await Chronicle.findOne({where});

        if(!chronicle) {
            throw new HttpError(404, "Aucune chronique trouvée avec cet ID");
        }
        return chronicle;
    }

    static async deleteChronicle(id:number){
        return Chronicle.destroy({ where: {id_chronicle: id}});
    }

    static async updateChronicle(id: number, data: any) {
        const chronicle = await Chronicle.findOne({ 
            where: { id_chronicle: id }
        });
        
        if (!chronicle) {
            throw new HttpError(404, "Aucune chronique trouvée");
        }

        await chronicle.update(data);
        
        return chronicle; }
}