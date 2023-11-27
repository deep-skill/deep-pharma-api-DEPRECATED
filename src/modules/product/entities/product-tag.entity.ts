import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  Index,
} from 'sequelize-typescript';
import { Product } from './product.entity';
import { Tag } from '../../tag/entities/tag.entity';

@Table({
  tableName: 'product_tags',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class ProductTag extends Model {
  @Index({ name: 'fk_product_tags_products1_idx' })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  products_id: number;

  @Index({ name: 'fk_product_tags_tags1_idx' })
  @ForeignKey(() => Tag)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  tags_id: number;
}
