import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthGQLGuard } from './jwt.guard';
import { CreateUserInput } from '../users/dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { CredentialsInput } from './dto/credentials.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGQLGuard)
  @Query(() => String, { name: 'login' })
  async login(@Args('credentials') credentials: CredentialsInput) {
    return await this.authService.login(credentials);
  }

  @Mutation(() => String, { name: 'signUp' })
  async signUp(@Args('userInput') user: CreateUserInput) {
    return await this.authService.create(user);
  }
}
