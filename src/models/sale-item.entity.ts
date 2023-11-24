import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
<<<<<<< HEAD:src/models/sale-item.model.ts
import { ConcentrationUnit } from './concentration-unit.model';
import { StockItem } from './stock-item.model';
import { Product } from './product.entity';
=======
import { ConcentrationUnit } from './concentration-unit.entity';
import { StockItem } from './stock-item.entity';
>>>>>>> c11114c534e5c022d3311f72964051daa0dfb7f1:src/models/sale-item.entity.ts

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

  // @Index({ name: 'fk_sale_items_products1_idx' })
  // @ForeignKey(() => Product)
  // @Column({
  //   type: DataType.BIGINT,
  //   allowNull: false,
  // })
  // products_id: number;

  @Column
  label: string;

  @Column
  description: string;

  @Column
  concentration: number;

<<<<<<< HEAD:src/models/sale-item.model.ts
  // @ForeignKey(() => ConcentrationUnit)
  // @Column({
  //   type: DataType.BIGINT,
  //   allowNull: false,
  // })
  // concentration_unit_id: number;
=======
  @ForeignKey(() => ConcentrationUnit)
  @Index('fk_venues_drugstore_id1_idx')
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  concentration_unit_id: number;
>>>>>>> c11114c534e5c022d3311f72964051daa0dfb7f1:src/models/sale-item.entity.ts

  // @BelongsTo(() => ConcentrationUnit)
  // ConcentrationUnit: ConcentrationUnit;

  @HasMany(() => StockItem)
<<<<<<< HEAD:src/models/sale-item.model.ts
  stock_items: StockItem[];

  // @BelongsTo(() => Product)
  // product: Product;
=======
  StockItems: StockItem[];
>>>>>>> c11114c534e5c022d3311f72964051daa0dfb7f1:src/models/sale-item.entity.ts
}
