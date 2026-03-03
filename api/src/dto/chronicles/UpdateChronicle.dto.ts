export interface UpdateChronicleDto {
    // Tous les champs sont requis car front envoi tous et route use PUT pas PATCH
    title: string;
    quote: string;
    summary: string;
    content: string;
    cover_url: string;
    published_at: string;
    is_active: boolean;
}
