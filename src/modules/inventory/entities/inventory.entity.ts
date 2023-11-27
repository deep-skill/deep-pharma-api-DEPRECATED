import { StockItem } from '@/modules/stock-item/entities/stock-item.entity';
import { Venue } from '@/modules/venue/entities/venue.entity';
import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  Index,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table({
  paranoid: true,
  tableName: 'inventories',
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Inventory extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @ForeignKey(() => Venue)
  @Index({ name: 'fk_inventory_venue_idx' })
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  venue_id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @BelongsTo(() => Venue)
  venue: Venue;

  @HasMany(() => StockItem)
  StockItems: StockItem[];
}
