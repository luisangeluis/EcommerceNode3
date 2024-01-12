import { Table, Model, DataType, Column, PrimaryKey, ForeignKey, Default, IsNumeric, BelongsTo } from "sequelize-typescript";
import { CartItemAttributes, CartItemCreationAttributes } from "../types";
import Product from "./Product.model";
import Cart from "./Cart.model";

@Table({
  timestamps: false
})
class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  id!: string;

  @Default(1)
  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  quantity!: number;

  @IsNumeric
  @Column({
    allowNull: false,
    type: DataType.DECIMAL(10, 2)
  })
  price!: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  productId!: string;

  @ForeignKey(() => Cart)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  cartId!: string;

  @BelongsTo(() => Product)
  product!: Product;

  @BelongsTo(() => Cart)
  cart!: Cart;
}

export default CartItem;
