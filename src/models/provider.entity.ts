import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
<<<<<<< HEAD:src/models/provider.model.ts
import { SupplyInvoice } from './supply-invoice.model';
=======
import { SupplyInvoice } from './supply-invoice.entity';
>>>>>>> c11114c534e5c022d3311f72964051daa0dfb7f1:src/models/provider.entity.ts

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
<<<<<<< HEAD:src/models/provider.model.ts
  supply_invoices: SupplyInvoice;
=======
  SupplyInvoices: SupplyInvoice;
>>>>>>> c11114c534e5c022d3311f72964051daa0dfb7f1:src/models/provider.entity.ts
}
