// import des decorateurs et classes pour definir le modèle
import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    Unique,
    HasMany,
    BelongsToMany
} from "sequelize-typescript";
import { UserRole } from "./UserRole";
import { User } from "./User";

// Dit à TypeScript :
// RoleAttributes = ce que contient la table
interface RoleAttributes {
    id_role:number
    name:string
} 
// Dit à TypeScript :
// RoleCreationAttributes = ce qu’on doit fournir à create()
interface RoleCreationAttributes { 
    name: string; 
}

// indique que la classe est une table
@Table({
    tableName: "role",
    underscored: true
})

//permet d’avoir le typage TypeScript sur les méthodes du modèle.
export class Role extends Model<RoleAttributes, RoleCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    // propriété TypeScript, de type number, avec ! pour dire à TS “je sais qu’elle sera toujours définie à l’exécution”.
    // Ce champ sera défini par Sequelize, même s’il n’est pas présent dans le constructeur.
    id_role!: number;

    @Unique
    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    name!:string;

    //En passant une fonction (() => UserRole) au lieu du résultat direct (UserRole)
    // Sequelize ne va pas lire la valeur immédiatement, mais plus tard, une fois que tous les modèles sont chargés.
    //() => UserRole → sera évalué au moment où Sequelize en a besoin.
    @HasMany(()=> UserRole)
    userRoles!: UserRole[];
    // userRoles : nom de la propriété (pluriel car relation 1/N)
    //UserRole[] :C’est le type TypeScript.
    //UserRole → une seule instance du modèle UserRole
    // UserRole[] → un tableau d’instances de UserRole (donc : plusieurs entrées dans la table user_role)

    @BelongsToMany(()=> User, ()=> UserRole)
    users!: User[];
}

