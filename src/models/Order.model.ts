import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { OrderAttributes, OrderCreationAttributes } from "../types";
import Cart from "./Cart.model";

@Table
export class Order extends Model<OrderAttributes, OrderCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id!: string;

  @ForeignKey(() => Cart)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  cartId!: string;

  @BelongsTo(() => Cart)
  cart!: Cart;
}
