import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLInt, GraphQLString } from 'graphql/type';
import { UserRepository } from '../../auth/entities/userRepository.entity';

@ObjectType()
@Table
export class User extends Model<User> {
  @Field(() => GraphQLInt, { nullable: true })
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Field(() => GraphQLString)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Field(() => GraphQLString)
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Field(() => GraphQLString, { nullable: true })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Field(() => [UserRepository], { nullable: true })
  @Column({
    type: DataTypes.JSONB,
    allowNull: true,
  })
  tokens: UserRepository[];
}
