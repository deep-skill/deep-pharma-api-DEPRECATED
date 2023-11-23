import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Venue } from './venue.model';

@Table({
  paranoid: true,
  tableName: 'drugstores',
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Drugstore extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({ allowNull: false, unique: 'idx_drugstore_RUC' })
  RUC: string;

  @Column({ allowNull: false, unique: 'idx_drugstore_legal_name' })
  legal_name: string;

  @Column
  commercial_name: string;

  @Column
  logo: string;

  @HasMany(() => Venue)
  venues: Venue[];
}
