import { Field, InputType } from '@nestjs/graphql';
import { GraphQLInt, GraphQLString } from 'graphql/type';

@InputType()
export class RepoSearchInput {
  @Field(() => GraphQLInt)
  idUser: number;

  @Field(() => GraphQLString)
  name: string;
}
