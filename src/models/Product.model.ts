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
} from "sequelize-typescript";
import type { ProductAttributes, ProductCreationAttributes } from "../types";
import Category from "./Category.model";
import CartItem from "./CartItem.model";

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

  @ForeignKey(() => Category)
  @Column({ allowNull: false, type: DataType.UUID })
  categoryId!: string;

  @BelongsTo(() => Category)
  category!: Category;

  // @BelongsToMany(() => Cart, () => CartItem)
  // carts?: Cart[];

  @HasMany(() => CartItem)
  cartItems!: CartItem[];
}

export default Product;
