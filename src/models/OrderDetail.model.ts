import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { OrderDetailAttributes, OrderDetailCreationAttributes } from "../types";

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
}

export default OrderDetail;
