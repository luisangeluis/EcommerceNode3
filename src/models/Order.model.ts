import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { OrderAttributes, OrderCreationAttributes } from "../types";
import Cart from "./Cart.model";
import OrderDetail from "./OrderDetail.model";

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

  @HasMany(() => OrderDetail)
  orderDetails!: OrderDetail[];
}
