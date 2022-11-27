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
  update(@Args('repoSearchInput') repoSearchInput: RepoSearchInput) {
    return this.repoService.update(repoSearchInput);
  }

  /* @Mutation('createRepo')
  create(@Args('createRepoInput') createRepoInput: CreateRepoInput) {
    return this.repoService.create(createRepoInput);
  }

  @Query('repo')
  findAll() {
    return this.repoService.findAll();
  }

  @Query('repo')
  findOne(@Args('id') id: number) {
    return this.repoService.findOne(id);
  }

  @Mutation('updateRepo')
  update(@Args('updateRepoInput') updateRepoInput: UpdateRepoInput) {
    return this.repoService.update(updateRepoInput.id, updateRepoInput);
  }

  @Mutation('removeRepo')
  remove(@Args('id') id: number) {
    return this.repoService.remove(id);
  }*/
}
