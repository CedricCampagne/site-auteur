import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique, BeforeUpdate, BeforeValidate } from "sequelize-typescript";
import { slugify } from "../utils/slugify";

interface BookAttributes {
    id_book: number
    title: string
    slug: string
    author: string
    summary: string
    excerpt: string
    published_at: Date
    publisher: string
    genre: string
    cover_url: string
    is_active: boolean
}

interface BookCreationAttributes {
    title: string
    slug?: string
    author: string
    summary: string
    excerpt: string
    published_at: Date
    publisher: string
    genre: string
    cover_url: string
    is_active: boolean
}

@Table({
    tableName: "book"
})

export class Book extends Model<BookAttributes, BookCreationAttributes> {

    @BeforeValidate
    @BeforeUpdate
    static generateSlug(instance: Book) {
        console.log("HOOK RUNNING, title =", instance.title);
        console.log("slugify() returns =", slugify(instance.title));

        if(instance.title){
            instance.slug = slugify(instance.title);
        }
    }

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
        type: DataType.TEXT,
        allowNull: false
    })
    excerpt!:string

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    published_at!: Date;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    publisher!:string

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    genre!:string

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