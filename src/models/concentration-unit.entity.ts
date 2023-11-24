import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { SaleItem } from './sale-item.entity';

@Table({
  paranoid: true,
  tableName: 'concentration_units',
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class ConcentrationUnit extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({
    allowNull: false,
    unique: 'idx_concentration_units_name',
  })
  name: string;

  // @HasMany(() => SaleItem)
  // SaleItems: SaleItem[];
}
