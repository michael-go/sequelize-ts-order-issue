import {Table, Model, Column, DataType, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {Org} from './Org';

@Table
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @ForeignKey(() => Org)
  @Column
  orgId: number;

  @BelongsTo(() => Org)
  Org: Org;
}
