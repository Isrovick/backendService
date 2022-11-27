import { Field, ObjectType } from '@nestjs/graphql';
import { Repo } from '../../repo/entities/repo.entity';

@ObjectType()
export class Repos {
  @Field(() => [Repo])
  repos: Repo[];
  @Field(() => [Repo])
  favoriteRepos: Repo[];
}
