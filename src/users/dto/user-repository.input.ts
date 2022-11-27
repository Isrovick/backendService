import { Field, InputType } from '@nestjs/graphql';
import { GraphQLInt, GraphQLString } from 'graphql/type';

@InputType()
export class UserRepositoryInput {
  @Field(() => GraphQLInt)
  idUser: number;
  @Field(() => GraphQLString)
  platformUserName: string;
  @Field(() => GraphQLString)
  platformToken: string;
  @Field(() => GraphQLString)
  platformName: string;
}
