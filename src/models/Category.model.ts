import { Column, DataType, PrimaryKey, Table, Model, HasMany } from 'sequelize-typescript';
import type { CategoryAttributes, CategoryCreationAttributes } from '../types';
import Product from './Product.model';

@Table
class Category extends Model<CategoryAttributes, CategoryCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  readonly id!: string;

  @Column({ allowNull: false })
  name!: string;

  @HasMany(() => Product)
  products!: Product[];
}

export default Category;
