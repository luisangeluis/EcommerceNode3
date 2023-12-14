import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  IsNumeric,
  ForeignKey,
  BelongsTo,
  HasMany,
  Length,
  Default,
  Is,
} from "sequelize-typescript";
import type { ProductAttributes, ProductCreationAttributes } from "../types";
import Category from "./Category.model";
import CartItem from "./CartItem.model";
import OrderDetail from "./OrderDetail.model";
import User from "./User.model";
import { ProductStatusEnum } from "../utils/Enums";
import ProductImage from "./ProductImage.model";

@Table
class Product extends Model<ProductAttributes, ProductCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id!: string;

  @Column({ allowNull: false })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @IsNumeric
  @Column({
    allowNull: false,
    type: DataType.DECIMAL(10, 2),
  })
  price!: number;

  @Is("status", (value) => {
    if (value !== "active" || value !== "inActive" || value !== "deleted")
      throw new Error(`"${value}" is not a valid value.`);
  })
  @Length({ max: 15 })
  @Default("active")
  @Column({ allowNull: false })
  status!: ProductStatusEnum;

  @ForeignKey(() => Category)
  @Column({ allowNull: false, type: DataType.UUID })
  categoryId!: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataType.UUID })
  sellerId!: string;

  @BelongsTo(() => Category)
  category!: Category;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => CartItem)
  cartItems!: CartItem[];

  @HasMany(() => OrderDetail)
  orderDetails!: OrderDetail[];

  @HasMany(() => ProductImage)
  productImage!: ProductImage[];
}

export default Product;
