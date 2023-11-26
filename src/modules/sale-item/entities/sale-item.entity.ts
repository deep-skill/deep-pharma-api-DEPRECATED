import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { ConcentrationUnit } from '../../concentration-unit/entities/concentration-unit.entity';
import { StockItem } from '../../stock-item/entities/stock-item.entity';

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
  @Index('fk_venues_drugstore_id1_idx')
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  concentration_unit_id: number;

  @BelongsTo(() => ConcentrationUnit)
  ConcentrationUnit: ConcentrationUnit;

  @HasMany(() => StockItem)
  StockItems: StockItem[];
}
