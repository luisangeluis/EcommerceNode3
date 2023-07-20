import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { RoleAttributes, RoleCreationAttributes } from "../types";
import { UserRoleEnum } from "../utils/Enums";
import User from "./User.model";

@Table
class Role extends Model<RoleAttributes, RoleCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id!: string;

  @Column({
    allowNull: false,
  })
  title!: UserRoleEnum;

  @HasMany(() => User)
  users!: User[];
}

export default Role;
