export interface CreateCommentDto {
    content: string;
    is_visible?: boolean;
    user_id: number;
    chronicle_id: number;
}