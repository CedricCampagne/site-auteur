export interface ChronicleDto {
    id_chronicle:number;
    title:string;
    slug:string;
    quote: string;
    summary: string;
    content:string;
    cover_url: string
    published_at: string | Date;
    is_active: boolean;
}