import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  HasOne,
} from "sequelize-typescript";
import { CartAttributes, CartCreationAttributes } from "../types";
import User from "./User.model";
import CartItem from "./CartItem.model";
import { Order } from "./Order.model";

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

  // @BelongsToMany(() => Product, () => CartItem)
  // products?: Product[];

  @HasMany(() => CartItem)
  cartItems!: CartItem[];

  @HasOne(() => Order)
  order!: Order;
}

export default Cart;
