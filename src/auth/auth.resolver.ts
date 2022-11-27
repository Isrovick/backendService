import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserInput } from '../users/dto/create-user.input';
import { CredentialsInput } from './dto/credentials.input';
import { loginInfo } from './entities/login-info.entity';
import { SignUpInfo } from './entities/signup-info.entity';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => loginInfo, { name: 'login' })
  async login(@Args('credentials') credentials: CredentialsInput) {
    return await this.authService.login(credentials);
  }

  @Mutation(() => SignUpInfo, { name: 'signUp' })
  async signUp(@Args('userInput') user: CreateUserInput) {
    return await this.authService.create(user);
  }
}
