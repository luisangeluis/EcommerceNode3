import {
  Table,
  Model,
  DataType,
  Column,
  PrimaryKey,
  ForeignKey,
  Default,
} from "sequelize-typescript";
import { CartItemAttributes, CartItemCreationAttributes } from "../types";
import Product from "./Product.model";
import Cart from "./Cart.model";

@Table
class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id!: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  productId!: string;

  @ForeignKey(() => Cart)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  cartId!: string;

  @Default(1)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;
}

export default CartItem;
