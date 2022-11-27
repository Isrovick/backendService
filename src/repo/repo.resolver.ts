import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RepoService } from './repo.service';
import { Repo } from './entities/repo.entity';
import { RepoSearchInput } from './dto/repo-search.input';
import { UseGuards } from '@nestjs/common';
import { AuthGQLGuard } from '../auth/jwt.guard';

@Resolver('Repo')
export class RepoResolver {
  constructor(private readonly repoService: RepoService) {}

  @UseGuards(AuthGQLGuard)
  @Query(() => [Repo])
  findAll(@Args('id') id: number) {
    return this.repoService.findAllByUserId(id);
  }

  @UseGuards(AuthGQLGuard)
  @Mutation(() => Repo)
  setFavourite(@Args('repoSearchInput') repoSearchInput: RepoSearchInput) {
    return this.repoService.setFavourite(repoSearchInput);
  }
}
