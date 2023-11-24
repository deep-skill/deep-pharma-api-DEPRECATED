import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  Index,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
<<<<<<< HEAD:src/models/supply-invoice.model.ts
import { Provider } from './provider.model';
import { StockItem } from './stock-item.model';
=======
import { Provider } from './provider.entity';
import { StockItem } from './stock-item.entity';
>>>>>>> c11114c534e5c022d3311f72964051daa0dfb7f1:src/models/supply-invoice.entity.ts

export enum InvoiceType {
  RECEIPT = 'receipt',
  INVOICE = 'invoice',
}

@Table({
  paranoid: true,
  tableName: 'supply_invoices',
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class SupplyInvoice extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.ENUM(...Object.values(InvoiceType)),
    allowNull: false,
  })
  invoice_type: InvoiceType;

  @Column({ type: DataType.STRING, allowNull: false })
  code: string;

  @Column({ type: DataType.DATE })
  delivered_at: Date;

  @Index({ name: 'fk_supply_invoices_providers1_idx' })
  @ForeignKey(() => Provider)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  provider_id: number;

  @BelongsTo(() => Provider)
  provider: Provider;

  @HasMany(() => StockItem)
<<<<<<< HEAD:src/models/supply-invoice.model.ts
  itock_items: StockItem[];
=======
  StockItems: StockItem[];
>>>>>>> c11114c534e5c022d3311f72964051daa0dfb7f1:src/models/supply-invoice.entity.ts
}
