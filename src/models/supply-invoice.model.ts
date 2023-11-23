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
import { Provider } from './provider.model';
import { StockItem } from './stock-item.model';

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
  itock_items: StockItem[];
}
