import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsNumeric,
  Model,
  PrimaryKey,
  Table,
  Validate,
} from "sequelize-typescript";
import { OrderDetailAttributes, OrderDetailCreationAttributes } from "../types";
import { Order } from "./Order.model";
import Product from "./Product.model";

@Table
class OrderDetail extends Model<
  OrderDetailAttributes,
  OrderDetailCreationAttributes
> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id!: string;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  orderId!: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  productId!: string;

  @Validate({
    min: 1,
  })
  @Column({
    type: DataType.SMALLINT,
    allowNull: false,
  })
  quantity!: number;

  @IsNumeric
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price!: number;

  @IsNumeric
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  subtotal!: number;

  @BelongsTo(() => Order)
  order!: Order;

  @BelongsTo(() => Product)
  product!: Product;
}

export default OrderDetail;
