import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsEmail,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { UserAttributes, UserCreationAttributes } from "../types";
import Role from "./Role.model";

@Table
class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id!: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  lastName!: string;

  @IsEmail
  @Column({
    type: DataType.STRING(250),
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING(400),
    allowNull: false,
  })
  password!: string;

  @ForeignKey(() => Role)
  @Column({ allowNull: false, type: DataType.UUID })
  roleId!: string;

  @BelongsTo(() => Role)
  role!: Role;
}

export default User;
