import { Inventory } from '@/modules/inventory/entities/inventory.entity';
import { SaleItem } from '@/modules/sale-item/entities/sale-item.entity';
import { SupplyInvoice } from '@/modules/supply-invoice/entities/supply-invoice.entity';
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

@Table({
  paranoid: true,
  tableName: 'stock_items',
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class StockItem extends Model {
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

  @Index({ name: 'fk_stock_items_SupplyInvoices1_idx' })
  @ForeignKey(() => SupplyInvoice)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  SupplyInvoice_id: number;

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
    defaultValue: 0,
  })
  quantity: number;

  @Index({ name: 'idx_stock_items_name', type: 'FULLTEXT' })
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

  @BelongsTo(() => SupplyInvoice)
  SupplyInvoice: SupplyInvoice;

  @BelongsTo(() => SaleItem)
  sale_item: SaleItem;
}
