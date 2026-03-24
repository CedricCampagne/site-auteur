export interface CreateChronicleDto {
    title: string;
    quote: string;
    summary: string;
    content: string;
    cover_url: string;
    published_at: string;
    is_active?: boolean;
}
