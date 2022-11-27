import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CredentialsInput } from './dto/credentials.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    // find if user exist with this email
    const user = await this.userService.findOneByEmail(username);
    if (!user) {
      return null;
    }

    // find if user password match
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }
    // tslint:disable-next-line: no-string-literal
    const { password, tokens, createdAt, updatedAt, ...result } =
      user['dataValues'];
    return result;
  }

  public async login(credential: CredentialsInput) {
    const validUser = this.validateUser(credential.email, credential.password);
    if (!validUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const user = await this.userService.findOneByEmail(credential.email);
    const { id, tokens, password, createdAt, updatedAt, ...userRest } =
      user['dataValues'];
    const token = await this.generateToken(userRest);

    console.log('userRest', userRest);
    return { user: userRest, token };
  }

  public async create(user) {
    // hash the password
    let _user = await this.userService.findOneByEmail(user.email);
    if (!_user) {
      const pass = await this.hashPassword(user.password);
      // create the user
      _user = await this.userService.create({ ...user, password: pass });
    }
    const { password, id, tokens, createdAt, updatedAt, ...userRest } =
      _user['dataValues'];
    // generate token
    const token = await this.generateToken(userRest);
    // return the user and the token

    return { user: userRest, token };
  }

  private async generateToken(user) {
    const { id, tokens, ...userRest } = user;
    const token = await this.jwtService.signAsync(userRest);
    return token;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
