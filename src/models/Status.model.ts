import { Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { StatusAttributes, StatusCreationAttributes } from '../types';
import User from './User.model';

@Table
class Status extends Model<StatusAttributes, StatusCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  id!: string;

  @Column({ allowNull: false, type: DataType.STRING(50) })
  title!: string;

  @HasMany(() => User)
  users!: User[];
}

export default Status;
