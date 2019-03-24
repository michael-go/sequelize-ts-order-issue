import {Table, Model, Column, HasMany} from 'sequelize-typescript';
import {User} from './User';

@Table
export class Org extends Model<Org> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @HasMany(() => User)
  users: User[];
}
