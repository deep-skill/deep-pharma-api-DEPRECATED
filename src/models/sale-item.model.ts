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
import { ConcentrationUnit } from './concentration-unit.model';
import { StockItem } from './stock-item.model';
import { Product } from './product.model';

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

  // @ForeignKey(() => ConcentrationUnit)
  // @Column({
  //   type: DataType.BIGINT,
  //   allowNull: false,
  // })
  // concentration_unit_id: number;

  // @BelongsTo(() => ConcentrationUnit)
  // ConcentrationUnit: ConcentrationUnit;

  @HasMany(() => StockItem)
  stock_items: StockItem[];

  // @BelongsTo(() => Product)
  // product: Product;
}
