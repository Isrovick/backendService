import { Field } from '@nestjs/graphql';
import { GraphQLBoolean, GraphQLInt, GraphQLString } from 'graphql/type';

export class CreateRepoInput {
  @Field(() => GraphQLInt)
  idUser: number;

  @Field(() => GraphQLString)
  name: string;

  @Field(() => GraphQLString)
  url: string;

  @Field(() => GraphQLBoolean)
  owner: string;

  @Field(() => GraphQLBoolean)
  isPrivate: boolean;

  @Field(() => GraphQLBoolean)
  favorite: boolean;
}
