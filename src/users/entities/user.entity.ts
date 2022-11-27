import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { UserRepositoryInput } from '../dto/user-repository.input';

@Table
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataTypes.JSONB,
    allowNull: true,
  })
  tokens: UserRepositoryInput[];
}
