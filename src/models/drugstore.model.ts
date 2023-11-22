import {
  Column,
  DataType,
  HasMany,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
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

  @Index('idx_drugstores_RUC_unique')
  @Column({ allowNull: false })
  RUC: string;

  @Index('idx_drugstore_legal_name_unique')
  @Column({ allowNull: false })
  legal_name: string;

  @Column
  commercial_name: string;

  @Column
  logo: string;

  @HasMany(() => Venue)
  venues: Venue[];
}
