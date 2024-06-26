import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table, Default } from "sequelize-typescript";
import { OrderAttributes, OrderCreationAttributes } from "../types";
import Cart from "./Cart.model";
import OrderDetail from "./OrderDetail.model";

@Table
class Order extends Model<OrderAttributes, OrderCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  id!: string;

  @ForeignKey(() => Cart)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  cartId!: string;

  @Default("created")
  @Column({
    type: DataType.STRING(20),
    allowNull: false
  })
  status?: string; //finished, progress, created, canceled

  @Column({
    type: DataType.DECIMAL,
    allowNull: false
  })
  total!: number;

  @BelongsTo(() => Cart)
  cart!: Cart;

  @HasMany(() => OrderDetail)
  orderDetails!: OrderDetail[];
}

export default Order;
