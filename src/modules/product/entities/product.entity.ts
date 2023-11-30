import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  Index,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Brand } from '@/modules/brand/entities/brand.entity';
import { Tag } from '@/modules/tag/entities/tag.entity';
import { ProductTag } from './product-tag.entity';
import { SaleItem } from '@/modules/sale-item/entities/sale-item.entity';

@Table({
  paranoid: true,
  tableName: 'products',
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Product extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Index({ name: 'fk_products_laboratories1_idx' })
  @ForeignKey(() => Brand)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  brand_id: number;

  @Index({ type: 'FULLTEXT', name: 'idx_products_name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({
    type: DataType.TINYINT,
    defaultValue: 0,
  })
  prescription_required: number;

  @BelongsTo(() => Brand)
  brand: Brand;

  @BelongsToMany(() => Tag, () => ProductTag)
  tags: Tag[];

  @HasMany(() => SaleItem)
  sale_items: SaleItem[];
}
