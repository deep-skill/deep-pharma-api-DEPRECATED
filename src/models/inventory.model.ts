import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Stock_items } from './stock-item.model';

@Table
export class Inventories extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({
    type: DataType.DATE,
    defaultValue: null,
  })
  deleted_at: Date;

  @HasMany(() => Stock_items)
  stock_items: Stock_items[];
}
