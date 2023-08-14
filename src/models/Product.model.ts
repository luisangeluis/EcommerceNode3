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
} from "sequelize-typescript";
import type { ProductAttributes, ProductCreationAttributes } from "../types";
import Category from "./Category.model";
import CartItem from "./CartItem.model";
import OrderDetail from "./OrderDetail.model";
import User from "./User.model";

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

  @Length({ max: 15 })
  @Column({
    allowNull: false,
  })
  status!: string;

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
}

export default Product;
