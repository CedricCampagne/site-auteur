import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique } from "sequelize-typescript";

interface BookAttributes {
    id_book: number
    title: string
    author: string
    summary: string
    published_at: Date
    cover_url: string
    slug: string
    is_active: boolean
}

interface BookCreationAttributes {
    title: string
    slug: string
    author: string
    summary: string
    published_at: Date
    cover_url: string
    is_active?: boolean
}

@Table({
    tableName: "book"
})

export class Book extends Model<BookAttributes, BookCreationAttributes> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id_book!: number;

    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title!:string

    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    slug!:string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    author!:string

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    summary!:string

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    published_at!: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    cover_url!:string

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true
    })
    is_active!: boolean;
}