import {
  Column,
  Model,
  Table,
  DataType,
  Index,
  BelongsToMany,
} from 'sequelize-typescript';
import { Product } from './product.entity';
import { ProductTag } from './product-tag.entity';

@Table({
  paranoid: true,
  tableName: 'Tags',
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Tag extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Index({
    type: 'FULLTEXT',
    name: 'idx_tags_name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Index({
    type: 'FULLTEXT',
    name: 'idx_tags_category',
  })
  @Column({ type: DataType.STRING })
  category: string;

  @BelongsToMany(() => Product, () => ProductTag)
  products: Product[];
}
