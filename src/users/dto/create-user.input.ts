import { Field, InputType } from '@nestjs/graphql';
import { UserRepositoryInput } from './user-repository.input';
@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
  @Field(() => String, { nullable: true })
  tokens: UserRepositoryInput[];
}
