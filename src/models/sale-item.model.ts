import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ConcentrationUnit } from './concentration-unit.model';
import { Stock_item } from './stock-item.model';

@Table({
  paranoid: true,
  tableName: 'sale_items',
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class SaleItem extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column
  label: string;

  @Column
  description: string;

  @Column
  concentration: number;

  @ForeignKey(() => ConcentrationUnit)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  concentration_unit_id: number;

  @BelongsTo(() => ConcentrationUnit)
  ConcentrationUnit: ConcentrationUnit;

  @HasMany(() => Stock_item)
  stock_items: Stock_item[];
}