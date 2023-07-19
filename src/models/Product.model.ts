import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  IsNumeric,
} from 'sequelize-typescript';
import type { ProductAttributes, ProductCreationAttributes } from '../types';

@Table
class Product extends Model<ProductAttributes, ProductCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  id!: string;

  @Column({ allowNull: false })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @IsNumeric
  @Column({ allowNull: false })
  price!: number;
}

export default Product;
