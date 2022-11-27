import { User } from '../../users/entities/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql/type';

@ObjectType()
export class SignUpInfo {
  @Field(() => User)
  user: User;
  @Field(() => GraphQLString)
  token: string;
}
