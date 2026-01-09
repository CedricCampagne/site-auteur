import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey} from "sequelize-typescript";
import { User } from "./User";
import { Chronicle } from "./Chronicle";

interface CommentAttributes {
    id_comment: number
    content: string
    is_valid: boolean
    id_user: number
    id_chronicle:number
}

interface CommentCreationAttributes {
    content: string
    is_valid?: boolean
    id_user: number
    id_chronicle:number
}

@Table ({
    tableName: "comment"
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
    is_valid!:boolean;

    @ForeignKey(()=> Chronicle)
    @Column(DataType.INTEGER)
    id_chronicle!:number

    @BelongsTo(()=> Chronicle)
    chronicle!: Chronicle;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    id_user!: number;

    @BelongsTo(()=> User)
    user!: User;
}