import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RepoService } from './repo.service';
import { Repo } from './entities/repo.entity';
import { RepoSearchInput } from './dto/repo-search.input';

@Resolver('Repo')
export class RepoResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Repo])
  findAll(@Args('id') id: number) {
    return this.repoService.findAllByUserId(id);
  }

  @Mutation(() => Repo)
  setFavourite(@Args('repoSearchInput') repoSearchInput: RepoSearchInput) {
    return this.repoService.setFavourite(repoSearchInput);
  }
}
