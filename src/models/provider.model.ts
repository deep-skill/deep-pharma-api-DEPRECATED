import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Supply_invoice } from './supply-invoice.model';

@Table({
  paranoid: true,
  tableName: 'Providers',
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

  @HasMany(() => Supply_invoice)
  supply_invoices: Supply_invoice;
}
