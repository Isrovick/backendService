import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserRepositoryInput } from './dto/user-repository.input';
import { UserRepository } from '../auth/entities/userRepository.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: typeof User,
  ) {}
  async create(createUserInput: CreateUserInput) {
    return await this.userRepository.create<User>(createUserInput);
  }

  async getUser(id: number): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new BadRequestException("User doesn't exist");
    }
    const userInfo = user['dataValues'];

    userInfo.password = '*********';
    userInfo.tokens = user.tokens.map((token) => {
      token.platformToken = '*********';
      return token;
    });
    return userInfo;
  }
  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: { email: email.toLowerCase() },
    });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async getGithubCredentials(id: number): Promise<UserRepositoryInput> {
    const user = await this.findOneById(id);
    for (const token of user.tokens) {
      if (token.platformName === process.env.GITHUB_NAME) {
        return token;
      }
    }
    return null;
  }
  async setGithubCredentials(userRepositoryInput: UserRepositoryInput) {
    const _user = await this.findOneById(userRepositoryInput.idUser);
    if (!_user) throw new BadRequestException("User doesn't exist");
    let user = _user['dataValues'];
    if (!user) return null;
    let flag = false;
    let newToken = userRepositoryInput;
    newToken.platformName = process.env.GITHUB_NAME;
    if (user.tokens) {
      for (const token of user.tokens) {
        if (token && token.platformName == process.env.GITHUB_NAME) {
          flag = true;
          user.tokens = user.tokens.map((token) => {
            if (token.platformName == process.env.GITHUB_NAME) {
              token.platformToken = userRepositoryInput.platformToken;
              token.platformUserName = userRepositoryInput.platformUserName;
            }
            return token;
          });
          await this.update({ id: user.id, tokens: user.tokens });
          return token;
        }
      }
      if (!flag) {
        user.tokens.push(userRepositoryInput);
      }
    } else {
      user.tokens = [];
      user.tokens.push(userRepositoryInput);
    }

    await this.update({ id: user.id, tokens: user.tokens });
    return newToken as UserRepository;
  }

  async update(updateUserInput: UpdateUserInput) {
    const { id, ...onlyUpdate } = updateUserInput;
    return await this.userRepository.update<User>(onlyUpdate, {
      where: { id },
    });
  }
  /*
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  */
}
