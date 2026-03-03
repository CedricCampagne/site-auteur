import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique, HasMany, BelongsToMany } from "sequelize-typescript";
import { Role } from "./Role";
import { UserRole } from "./UserRole";
import { Comment } from "./Comment";

export interface UserAttributes {
    id_user:number;
    username:string;
    email:string;
    password:string;
    is_active:boolean;
    roles?: Role[];
} 

export interface UserCreationAttributes {
    username:string
    email:string;
    password:string;
    is_active:boolean
}

export type UserUpdateAttributes = Partial<Omit<UserAttributes, "id_user">>;

@Table({
    tableName: "user",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true
})

export class User extends Model<UserAttributes, UserCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_user!: number;

    @Unique
    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    username!:string;

    @Unique
    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    email!:string;

    // ne jamais mettre @Unique sur un pass qui va etre hash
    @Column({
        type: DataType.STRING(200),
        allowNull: false
    })
    password!:string;

    @Column({
        type:DataType.BOOLEAN,
        defaultValue: true
    })
    is_active!:boolean

    // Relation N:N avec Role via UserRole
    @BelongsToMany(()=>Role, ()=> UserRole)
    roles!: Role[];

    // Relation avec Comment
    @HasMany(()=> Comment)
    comments!: Comment[];

    @Column(DataType.DATE)
    created_at!: Date;

    @Column(DataType.DATE)
    updated_at!: Date;
}