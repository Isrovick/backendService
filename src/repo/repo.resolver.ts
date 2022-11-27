import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RepoService } from './repo.service';
import { CreateRepoInput } from './dto/create-repo.input';
import { UpdateRepoInput } from './dto/update-repo.input';

@Resolver('Repo')
export class RepoResolver {
  constructor(private readonly repoService: RepoService) {}

  @Mutation('createRepo')
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
  }
}
