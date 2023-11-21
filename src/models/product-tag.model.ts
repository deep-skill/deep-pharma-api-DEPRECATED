import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Product } from './product.model';
import { Tag } from './tag.model';

@Table({
  tableName: 'Product-tags',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class ProductTag extends Model {
  @ForeignKey(() => Product)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  products_id: number;

  @ForeignKey(() => Tag)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  tags_id: number;
}
