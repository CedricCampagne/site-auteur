export interface Book {
   id_book: number;
    title: string;
    slug: string;
    author: string;
    summary: string;
    excerpt: string;
    published_at: string | Date;
    publisher: string;
    genre: string;
    cover_url: string;
    is_active: boolean;
}

export interface Chronicle {
    id_chronicle: number
    title:string;
    slug:string;
    quote: string;
    summary: string;
    content:string;
    cover_url: string
    published_at: string | Date;
    is_active?:boolean;
}