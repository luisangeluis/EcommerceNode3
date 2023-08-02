import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import { CartAttributes, CartCreationAttributes } from "../types";
import User from "./User.model";
import Product from "./Product.model";
import CartItem from "./CartItem.model";

@Table
class Cart extends Model<CartAttributes, CartCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id!: string;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  userId!: string;

  @BelongsTo(() => User)
  user!: User;

  @BelongsToMany(() => Product, () => CartItem)
  products?: Product[];
}

export default Cart;
