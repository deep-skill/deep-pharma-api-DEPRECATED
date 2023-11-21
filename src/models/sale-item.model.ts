import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ConcentrationUnit } from './concentration-unit.model';

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
}
