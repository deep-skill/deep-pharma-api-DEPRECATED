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
<<<<<<< HEAD:src/models/stock-item.model.ts
import { Inventory } from './inventory.model';
import { SupplyInvoice } from './supply-invoice.model';
import { SaleItem } from './sale-item.model';
=======
import { Inventory } from './inventory.entity';
import { SupplyInvoice } from './supply-invoice.entity';
import { SaleItem } from './sale-item.entity';
>>>>>>> c11114c534e5c022d3311f72964051daa0dfb7f1:src/models/stock-item.entity.ts

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

<<<<<<< HEAD:src/models/stock-item.model.ts
  @Index({ name: 'fk_stock_items_supply_invoices1_idx' })
=======
  @Index({ name: 'fk_stock_items_SupplyInvoices1_idx' })
>>>>>>> c11114c534e5c022d3311f72964051daa0dfb7f1:src/models/stock-item.entity.ts
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
<<<<<<< HEAD:src/models/stock-item.model.ts
  supply_invoice: SupplyInvoice;
=======
  SupplyInvoice: SupplyInvoice;
>>>>>>> c11114c534e5c022d3311f72964051daa0dfb7f1:src/models/stock-item.entity.ts

  @BelongsTo(() => SaleItem)
  sale_item: SaleItem;
}
