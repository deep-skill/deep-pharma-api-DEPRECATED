import {
    Column,
    Model,
    Table,
    DataType,
    CreatedAt,
    ForeignKey,
    BelongsTo,
    Index,
  } from 'sequelize-typescript';
  import { Inventories } from './inventory.model';
  
  @Table
  export class Stock_items extends Model {
    @Column({
      type: DataType.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    })
    id: number;
  
    @Index('fk_inventory_items_inventory1_idx')
    @ForeignKey(() => Inventories)
    @Column({
      type: DataType.BIGINT,
      allowNull: false,
    })
    inventory_id: number;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    quantity: number;
  
    @Column({ type: DataType.STRING })
    comment: string;
  
    @Index('idx_inventory_items_expres_at')
    @Column({ type: DataType.DATE })
    expires_at: Date;
  
    @Column({
      type: DataType.DATE,
      defaultValue: null,
    })
    deleted_at: Date;
  
    @Index('idx_inventory_items_created_at')
    @CreatedAt
    created_at: Date;
  
    @BelongsTo(() => Inventories)
    inventory: Inventories;
  }