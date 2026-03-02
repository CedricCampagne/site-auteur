import { RoleDto } from "../role/Role.dto";

export interface UserDto {
    id_user: number;
    username: string;
    email: string;
    is_active: boolean;
    roles?: RoleDto[];
    created_at: string;
    updated_at: string;
}