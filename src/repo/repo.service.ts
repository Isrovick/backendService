import { Inject, Injectable } from '@nestjs/common';
import { CreateRepoInput } from './dto/create-repo.input';
import { UpdateRepoInput } from './dto/update-repo.input';
import { Repos } from './entities/repos.entity';
import { Repo } from './entities/repo.entity';
import { UsersService } from '../users/users.service';
import { HttpService } from '@nestjs/axios';
import { RepoSearchInput } from './dto/repo-search.input';

@Injectable()
export class RepoService {
  constructor(
    @Inject('REPO_REPOSITORY') private readonly repoRepository: typeof Repo,
    private readonly userService: UsersService,
    private readonly httpService: HttpService,
  ) {}
  async create(createRepoInput: CreateRepoInput) {
    return await this.repoRepository.create<Repo>(createRepoInput);
  }

  async update(updateRepoInput: UpdateRepoInput) {
    const { idUser, ...onlyUpdate } = updateRepoInput;
    return await this.repoRepository.update<Repo>(onlyUpdate, {
      where: { idUser: updateRepoInput.idUser, name: updateRepoInput.name },
    });
  }

  async fetchGithubRepos(idUser) {
    const credentials = await this.userService.getGithubCredentials(idUser);
    if (!credentials) return null;
    const body = {
      query: `query {
                viewer {
                  repositories(orderBy: {field:NAME, direction:ASC}) {
                    pageInfo {hasNextPage, endCursor}
                    nodes {
                      name
                      url
                      isPrivate
                      owner {
                        login
                      }
                      defaultBranchRef {
                        name
                      }
                    }
                  }
                }
              }`,
    };
    const response = await this.httpService.axiosRef.post(
      process.env.GITHUB_GRAPHQL_API,
      body,
      {
        headers: {
          Authorization: `Bearer ${credentials.platformToken}`,
          contentType: 'application/json',
        },
      },
    );
    console.log(response.data);
  }

  async findOne(repoSearchInput: RepoSearchInput) {
    return await this.repoRepository.findOne<Repo>({
      where: { idUser: repoSearchInput.idUser, name: repoSearchInput.name },
    });
  }

  async setFavourite(repoSearchInput: RepoSearchInput) {
    const repo = await this.findOne(repoSearchInput);
    if (!repo) return null;
    repo.favourite = !repo.favourite;
    await this.update(repo);
    return repo;
  }

  async findAllByUserId(idUser): Promise<Array<Repo>> {
    return await this.repoRepository.findAll<Repo>({
      where: { idUser, active: true },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} repo`;
  }
}
