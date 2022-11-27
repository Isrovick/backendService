import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLBoolean, GraphQLInt, GraphQLString } from 'graphql/type';

@ObjectType()
@Table
export class Repo extends Model<Repo> {
  @Field(() => GraphQLInt)
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
  })
  idUser: number;

  @Field(() => GraphQLString)
  @Column({
    primaryKey: true,
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Field(() => GraphQLString)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  url: string;

  @Field(() => GraphQLString)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  owner: string;

  @Field(() => GraphQLBoolean)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isPrivate: boolean;

  @Field(() => GraphQLBoolean)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  favourite: boolean;

  @Field(() => GraphQLBoolean)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  active: boolean;
}
