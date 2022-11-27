import { Test, TestingModule } from '@nestjs/testing';
import { RepoResolver } from './repo.resolver';
import { RepoService } from './repo.service';

describe('RepoResolver', () => {
  let resolver: RepoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepoResolver, RepoService],
    }).compile();

    resolver = module.get<RepoResolver>(RepoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
