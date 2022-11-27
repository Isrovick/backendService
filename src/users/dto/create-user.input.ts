import { Field } from '@nestjs/graphql';

export class CreateUserInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
  @Field(() => String)
  gender: string;
}
