import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthGQLGuard } from './jwt.guard';
import { CreateUserInput } from '../users/dto/create-user.input';
import { UseGuards } from '@nestjs/common';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGQLGuard)
  @Query('login')
  async login(@Args('credentials') credentials) {
    return await this.authService.login(credentials);
  }

  @Mutation('signup')
  async signUp(@Args('userInput') user: CreateUserInput) {
    return await this.authService.create(user);
  }
}
