import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateRepoInput } from './dto/create-repo.input';
import { UpdateRepoInput } from './dto/update-repo.input';
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
    console.log(onlyUpdate);
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
                  repositories(first:100,orderBy: {field:NAME, direction:ASC}) {
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

    const result = (await new Promise(async (resolve, reject) => {
      await this.httpService.axiosRef
        .post(process.env.GITHUB_GRAPHQL_API, body, {
          headers: {
            Authorization: `bearer ${credentials.platformToken}`,
            contentType: 'application/json',
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    })) as any;
    if (result.data) {
      return result.data.viewer.repositories.nodes;
    } else {
      console.log(result.errors);
      throw new InternalServerErrorException(result.errors);
    }
  }

  async findOne(repoSearchInput: RepoSearchInput) {
    const user = await this.repoRepository.findOne<Repo>({
      where: { idUser: repoSearchInput.idUser, name: repoSearchInput.name },
    });
    return user['dataValues'];
  }

  async setFavourite(repoSearchInput: RepoSearchInput) {
    const repo = await this.findOne(repoSearchInput);
    if (!repo) return null;
    repo.favourite = !repo.favourite;
    await this.update(repo);
    return repo;
  }

  async findAllByUserId(idUser): Promise<Array<Repo>> {
    const nodes = await this.fetchGithubRepos(idUser);
    return await this.processGithubNodes(idUser, nodes);
  }

  async processGithubNodes(idUser, nodes) {
    return await nodes.map(async (node) => {
      const repo = await this.repoRepository.findOne<Repo>({
        where: { idUser, name: node.name },
      });
      if (repo) return repo['dataValues'];
      else {
        const newRepo = await this.repoRepository.create<Repo>({
          idUser,
          name: node.name,
          url: node.url,
          owner: node.owner.login,
          favourite: false,
          isPrivate: node.isPrivate,
          active: true,
        });
        return newRepo['dataValues'];
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} repo`;
  }
}
