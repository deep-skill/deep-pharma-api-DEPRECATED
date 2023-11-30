import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Product } from '@/modules/product/entities/product.entity';

@Table({
  paranoid: true,
  tableName: 'Brands',
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Brand extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @HasMany(() => Product)
  Products: Product[];
}
