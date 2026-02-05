import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique, BeforeUpdate, BeforeValidate, HasMany, Index } from "sequelize-typescript";
import { slugify } from "../utils/slugify";
import { Comment } from "./Comment";

interface ChronicleAttributes {
    id_chronicle:number;
    title:string;
    slug:string;
    quote: string;
    summary: string;
    content:string;
    cover_url: string
    published_at: string | Date;
    is_active?:boolean;
}

interface ChronicleCreationAttributes {
    title:string;
    slug:string;
    quote: string;
    summary: string;
    content:string;
    cover_url: string
    published_at: string | Date;
    is_active?:boolean;
}

@Table ({
    tableName: "chronicle",
    timestamps: true
})

export class Chronicle extends Model<ChronicleAttributes, ChronicleCreationAttributes>{

    @BeforeValidate
    @BeforeUpdate
    static generateSlug(instance: Chronicle) {
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
    id_chronicle!:number;

    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title!:string

    @Unique
    @Index
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    slug!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    quote!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    summary!:string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    content!:string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    cover_url!:string
    
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    published_at!: Date;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true
    })
    is_active!: boolean;

    @HasMany(()=> Comment)
    comments!: Comment[];
}

