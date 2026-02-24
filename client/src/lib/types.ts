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

export interface Comment {
    id_comment: number;
    content: string;
    is_visible: boolean;
    user_id: number;
    chronicle_id:number;
    created_at: string;
    updated_at: string;

    user: {
        id_user: number;
        username: string
    };

    chronicle: {
        id_chronicle: number;
        title: string;
    }
}

export interface User {
    id_user:number;
    username:string;
    email:string;
    password:string;
    is_active:boolean;
    created_at: Date | string;
}

export interface UserForm {
    id_user:number;
    username:string;
    email:string;
    password?:string;
    is_active:boolean;
}

export interface UserFormCreate {
    username:string;
    email:string;
    password:string;
    is_active:boolean;
}

export interface ApiResponse<T> {
    type: "success" | "fail";
    message: string;
    data?: T;
}
