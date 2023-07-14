import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
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
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({ allowNull: false })
  price!: number;
}

export default Product;
