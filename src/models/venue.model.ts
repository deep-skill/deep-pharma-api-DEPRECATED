import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Drugstore } from './drugstore.model';

@Table
export class Venue extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column
  address: string;

  @Column
  phone_number: string;

  @Column
  email: string;

  @Column
  deleted_at: Date;

  @Column({ allowNull: false })
  @CreatedAt
  created_at: Date;

  @Column({ allowNull: false })
  @UpdatedAt
  updated_at: Date;

  @ForeignKey(() => Drugstore)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  drugstore_id: number;

  @BelongsTo(() => Drugstore)
  drugstore: Drugstore;
}
