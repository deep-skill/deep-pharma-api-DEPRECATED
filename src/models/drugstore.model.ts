import {
  Column,
  DataType,
  HasMany,
  Index,
  Model,
  Table,
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

  @Index({ unique: true, name: 'idx_drugstores_RUC_unique' })
  @Column({ unique: true, allowNull: false })
  RUC: string;

  @Index({ unique: true, name: 'idx_drugstore_legal_name_unique' })
  @Column({ unique: true, allowNull: false })
  legal_name: string;

  @Column
  commercial_name: string;

  @Column
  logo: string;

  @Column
  deletedAt: Date;

  @HasMany(() => Venue)
  venues: Venue[];
}
