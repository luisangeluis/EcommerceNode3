import {
  Table,
  Model,
  DataType,
  Column,
  PrimaryKey,
  ForeignKey,
  Default,
  IsNumeric,
  BelongsTo,
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

  @BelongsTo(() => Product)
  product!: Product;

  @BelongsTo(() => Cart)
  cart!: Cart;

  @Default(1)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;

  @IsNumeric
  @Column({
    allowNull: false,
    type: DataType.DECIMAL(10, 2),
  })
  price!: number;
}

export default CartItem;
