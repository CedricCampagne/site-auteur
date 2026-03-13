export interface BookDto {
    id_book: number;
    title: string;
    slug: string;
    author: string;
    summary: string;
    excerpt: string;
    published_at: string;
    publisher: string | null;
    genre: string;
    cover_url: string;
    is_active: boolean;
}
