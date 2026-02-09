import { Table, Column, Model, DataType, AutoIncrement, Unique, HasMany, BelongsToMany, ForeignKey } from "sequelize-typescript";
import { Role } from "./Role";
import { User } from './User'

interface UserRoleCreationAttributes {
  id_user: number;
  id_role: number;
}

@Table({
    tableName: "user_role",
    underscored: true
})

export class UserRole extends Model<UserRoleCreationAttributes> {

    @ForeignKey(()=> User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id_user!:number;

    @ForeignKey(()=> Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id_role!:number;

}