import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  ForeignKey,
  BelongsTo,
  Index,
} from 'sequelize-typescript';
import { Inventory } from './inventory.model';
import { Supply_invoice } from './supply-invoice.model';
import { SaleItem } from './sale-item.model';

@Table({
  paranoid: true,
  tableName: 'Stock_items',
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Stock_item extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Index({ name: 'fk_stock_items_inventory1_idx' })
  @ForeignKey(() => Inventory)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  inventory_id: number;

  @Index({ name: 'fk_stock_items_supply_invoices1_idx' })
  @ForeignKey(() => Supply_invoice)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  supply_invoice_id: number;

  @Index({ name: 'fk_stock_items_sale_items1_idx' })
  @ForeignKey(() => SaleItem)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  sale_item_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @Index({ name: 'idx_stock_items_name' })
  @Column({ type: DataType.STRING })
  comment: string;

  @Index({ name: 'idx_stock_items_expires_at' })
  @Column({ type: DataType.DATE })
  expires_at: Date;

  @Index('idx_stock_items_created_at')
  @CreatedAt
  created_at: Date;

  @BelongsTo(() => Inventory)
  inventory: Inventory;

  @BelongsTo(() => Supply_invoice)
  supply_invoice: Supply_invoice;

  @BelongsTo(() => SaleItem)
  sale_item: SaleItem;
}
