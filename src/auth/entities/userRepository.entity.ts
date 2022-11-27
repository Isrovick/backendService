import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { GraphQLInt, GraphQLString } from 'graphql/type';

@ObjectType()
export class UserRepository {
  @Field(() => GraphQLInt)
  idUser: number;
  @Field(() => GraphQLString)
  platformUserName: string;
  @Field(() => GraphQLString)
  platformToken: string;
  @Field(() => GraphQLString)
  platformName: string;
}
