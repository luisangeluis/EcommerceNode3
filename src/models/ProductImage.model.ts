import Product from "./Product.model";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsUrl,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import {
  ProductImageAttributes,
  ProductImageCreationAttributes,
} from "../types";

@Table
class ProductImage extends Model<
  ProductImageAttributes,
  ProductImageCreationAttributes
> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id!: string;

  @ForeignKey(() => Product)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  productId!: string;

  @IsUrl
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  url!: string;

  @BelongsTo(() => Product)
  product!: Product;
}

export default ProductImage;
