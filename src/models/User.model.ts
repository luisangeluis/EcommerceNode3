import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  IsEmail,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';
import { UserAttributes, UserCreationAttributes } from '../types';
import Role from './Role.model';
import Cart from './Cart.model';
import Product from './Product.model';
import Status from './Status.model';

@Table
class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  id!: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false
  })
  firstName!: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false
  })
  lastName!: string;

  @Unique
  @IsEmail
  @Column({
    type: DataType.STRING(250),
    allowNull: false
  })
  email!: string;

  @Column({
    type: DataType.STRING(400),
    allowNull: false
  })
  password!: string;

  @ForeignKey(() => Role)
  @Column({ allowNull: false, type: DataType.UUID })
  roleId!: string;

  @ForeignKey(() => Status)
  @Column({ allowNull: false, type: DataType.UUID })
  statusId!: string;

  @BelongsTo(() => Role)
  role!: Role;

  @BelongsTo(() => Status)
  status!: Status;

  @HasOne(() => Cart)
  cart!: Cart;

  @HasMany(() => Product)
  products!: Product[];
}

export default User;
