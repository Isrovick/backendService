import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { GraphQLString } from 'graphql/type';

@ObjectType()
export class loginInfo {
  @Field(() => User)
  user: User;
  @Field(() => GraphQLString)
  token: string;
}
