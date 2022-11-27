import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserRepositoryInput } from './dto/user-repository.input';
import { UseGuards } from '@nestjs/common';
import { AuthGQLGuard } from '../auth/jwt.guard';
import { UserRepository } from '../auth/entities/userRepository.entity';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGQLGuard)
  @Mutation(() => UserRepository)
  setGithubCredentials(
    @Args('userRepositoryInput') userRepositoryInput: UserRepositoryInput,
  ) {
    return this.usersService.setGithubCredentials(userRepositoryInput);
  }
}
