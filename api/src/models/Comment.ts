import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    BelongsTo,
    ForeignKey,
    Index
} from "sequelize-typescript";
import { User } from "./User";
import { Chronicle } from "./Chronicle";

interface CommentAttributes {
    id_comment: number;
    content: string;
    is_visible: boolean;
    user_id: number;
    chronicle_id: number;
    created_at: Date;
    updated_at: Date;
}

interface CommentCreationAttributes {
    content: string;
    is_visible?: boolean;
    user_id: number;
    chronicle_id: number;
    created_at?: Date;
    updated_at?: Date;
}

@Table ({
    tableName: "comment",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
})

export class Comment extends Model<CommentAttributes, CommentCreationAttributes> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id_comment!:number;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    content!: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true
    })
    is_visible!:boolean;

    @ForeignKey(()=> Chronicle)
    @Index
    @Column({
        type:DataType.INTEGER,
        allowNull: false
    })
    chronicle_id!:number

    @BelongsTo(()=> Chronicle)
    chronicle!: Chronicle;

    @ForeignKey(() => User)
    @Index
    @Column(DataType.INTEGER)
    user_id!: number;

    @BelongsTo(()=> User)
    user!: User;

    @Column(DataType.DATE)
    created_at!: Date;

    @Column(DataType.DATE)
    updated_at!: Date;
}