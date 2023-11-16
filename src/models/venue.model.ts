import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
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

  @Column
  name: string;

  @Column
  address: string;

  @Column
  phone_number: string;

  @Column
  email: string;

  @ForeignKey(() => Drugstore)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  drugstore_id: number;

  @BelongsTo(() => Drugstore)
  drugstore: Drugstore;
}