import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique, HasMany, BelongsToMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Comment } from "./Comment";
import { Col } from "sequelize/types/utils";

interface ChronicleAttributes {
    id_chronicle:number
    title:string
    content:string
    published_at: Date
    slug:string
    is_active?:boolean
}

interface ChronicleCreationAttributes {
    title:string
    content:string
    published_at: Date
    slug:string
    is_active?:boolean
}

@Table ({
    tableName: "chronicle"
})

export class Chronicle extends Model<ChronicleAttributes, ChronicleCreationAttributes>{

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id_chronicle!:number;

    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title!:string

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    content!:string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    published_at!: Date;

    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    slug!: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true
    })
    is_active!: boolean;

    @HasMany(()=> Comment)
    comments!: Comment[];
}

