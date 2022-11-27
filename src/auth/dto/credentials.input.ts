import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CredentialsInput {
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
}
