import { SupplyInvoice } from '@/modules/supply-invoice/entities/supply-invoice.entity';
import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';

@Table({
  paranoid: true,
  tableName: 'providers',
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Provider extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  RUC: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  legal_name: string;

  @HasMany(() => SupplyInvoice)
  SupplyInvoices: SupplyInvoice;
}
