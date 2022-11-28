import { Repo } from './entities/repo.entity';

export const reposProviders = [
  {
    provide: 'REPO_REPOSITORY',
    useValue: Repo,
  },
];
