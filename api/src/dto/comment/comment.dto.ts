export interface CommentDto {
    id_comment: number;
    content: string;
    is_visible: boolean;
    user_id: number;
    chronicle_id: number;
    created_at: string;
    updated_at: string;

    user: {
        id_user: number;
        username: string;
    };

    chronicle: {
        id_chronicle: number;
        title: string;
    };
}
