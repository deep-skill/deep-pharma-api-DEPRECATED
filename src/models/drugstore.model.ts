import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Index,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Venue } from './venue.model';

@Table
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

  @Column
  deleted_at: Date;

  @Column({ allowNull: false })
  @CreatedAt
  created_at: Date;

  @Column({ allowNull: false })
  @UpdatedAt
  updated_at: Date;

  @HasMany(() => Venue)
  venues: Venue[];
}
