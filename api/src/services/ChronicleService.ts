import { sequelize } from "../config/database";
import { Chronicle, ChronicleCreationAttributes } from "../models/Chronicle";
import { HttpError } from "../errors/HttpError";
import { ChronicleDto } from "../dto/chronicles/chronicles.dto";

export class ChronicleService {
    static async getAllChronicles(isAdmin: boolean ): Promise<ChronicleDto[]> {
        const where = isAdmin ? {} : { is_active:true };
        const chronicles= await Chronicle.findAll({
            where,
            order: [["published_at", "DESC"]]
        });

        if(!chronicles || chronicles.length === 0) {
            throw new HttpError(404, "Aucune chronique trouvée");
        }
        return chronicles.map(chronicle =>({
            id_chronicle:chronicle.id_chronicle,
            title:chronicle.title,
            slug:chronicle.slug,
            quote: chronicle.quote,
            summary: chronicle.summary,
            content:chronicle.content,
            cover_url: chronicle.cover_url,
            is_active: chronicle.is_active,
            published_at: chronicle.published_at.toISOString()
        }));
    }
       
    static async getRandom3Chronicles(): Promise<ChronicleDto[]> {
        const chronicles= await Chronicle.findAll({
            order: sequelize.literal('RANDOM()'),
            limit: 3
        })
        if(!chronicles || chronicles.length === 0) {
            throw new HttpError(404, "Aucune chronique trouvée");
        }
        return chronicles.map(chronicle =>({
            id_chronicle:chronicle.id_chronicle,
            title:chronicle.title,
            slug:chronicle.slug,
            quote: chronicle.quote,
            summary: chronicle.summary,
            content:chronicle.content,
            cover_url: chronicle.cover_url,
            is_active: chronicle.is_active,
            published_at: chronicle.published_at.toISOString()
        }));
    }

    static async getLatest3Chronicles(): Promise<ChronicleDto[]> {
        const chronicles= await Chronicle.findAll({
            order: [["published_at", "DESC"]],
            limit: 3
        })
        if(!chronicles || chronicles.length === 0) {
            throw new HttpError(404, "Aucune chronique trouvée");
        }
        return chronicles.map(chronicle =>({
            id_chronicle:chronicle.id_chronicle,
            title:chronicle.title,
            slug:chronicle.slug,
            quote: chronicle.quote,
            summary: chronicle.summary,
            content:chronicle.content,
            cover_url: chronicle.cover_url,
            is_active: chronicle.is_active,
            published_at: chronicle.published_at.toISOString()
        }));
    }

    static async getBySlug(slug: string): Promise<ChronicleDto> {
        const chronicle= await Chronicle.findOne({
            where: { slug }
        })
        if(!chronicle) {
            throw new HttpError(404, "Aucune chronique trouvée avec ce slug");
        }
        return {
            id_chronicle:chronicle.id_chronicle,
            title:chronicle.title,
            slug:chronicle.slug,
            quote: chronicle.quote,
            summary: chronicle.summary,
            content:chronicle.content,
            cover_url: chronicle.cover_url,
            is_active: chronicle.is_active,
            published_at: chronicle.published_at.toISOString()
        };
    }

    static async getChroniclesById(id:number, isAdmin: boolean =false): Promise<ChronicleDto> {
        
        const where : Partial<Chronicle>= isAdmin
            ? { id_chronicle : id}
            : { id_chronicle: id, is_active: true};

        const chronicle= await Chronicle.findOne({where});

        if(!chronicle) {
            throw new HttpError(404, "Aucune chronique trouvée avec cet ID");
        }

        return {
            id_chronicle:chronicle.id_chronicle,
            title:chronicle.title,
            slug:chronicle.slug,
            quote: chronicle.quote,
            summary: chronicle.summary,
            content:chronicle.content,
            cover_url: chronicle.cover_url,
            is_active: chronicle.is_active,
            published_at: chronicle.published_at.toISOString()
        };
    }

    static async deleteChronicle(id:number): Promise<number>{
        const deleted = await Chronicle.destroy({
            where: { id_chronicle: id }
        });
       
        if (deleted === 0) {
            throw new HttpError(404, "Chronique introuvable");
        }
        return deleted;
    }

    static async updateChronicle(id: number, data: ChronicleCreationAttributes): Promise<ChronicleDto> {
        const chronicle = await Chronicle.findOne({ 
            where: { id_chronicle: id }
        });
        
        if (!chronicle) {
            throw new HttpError(404, "Aucune chronique trouvée");
        }

        await chronicle.update(data);
        
        return {
            id_chronicle:chronicle.id_chronicle,
            title:chronicle.title,
            slug:chronicle.slug,
            quote: chronicle.quote,
            summary: chronicle.summary,
            content:chronicle.content,
            cover_url: chronicle.cover_url,
            is_active: chronicle.is_active,
            published_at: chronicle.published_at.toISOString()
        };
    }

    static async toggleChronicle(id:number):  Promise<ChronicleDto>{
        const chronicle = await Chronicle.findOne({
            where: { id_chronicle: id}
        });

        if (!chronicle) {
            throw new HttpError(404, "Aucune chronique trouvée");
        }

        chronicle.is_active = !chronicle.is_active;
        await chronicle.save();

        return {
            id_chronicle:chronicle.id_chronicle,
            title:chronicle.title,
            slug:chronicle.slug,
            quote: chronicle.quote,
            summary: chronicle.summary,
            content:chronicle.content,
            cover_url: chronicle.cover_url,
            is_active: chronicle.is_active,
            published_at: chronicle.published_at.toISOString()
        };
    }

    static async createChronicle(data:ChronicleCreationAttributes): Promise<ChronicleDto>{
        try {
            const chronicle = await Chronicle.create({
                title: data.title,
                quote: data.quote,
                summary: data.summary,
                content: data.content,
                cover_url: data.cover_url,
                published_at: data.published_at,
                is_active: data.is_active ?? true
            });       

            return {
                id_chronicle:chronicle.id_chronicle,
                title:chronicle.title,
                slug:chronicle.slug,
                quote: chronicle.quote,
                summary: chronicle.summary,
                content:chronicle.content,
                cover_url: chronicle.cover_url,
                is_active: chronicle.is_active,
                published_at: chronicle.published_at.toISOString()
            };

        } catch (err:any) {
            throw new HttpError(400, "Impossible de creer la chronique");
        }
    }
}