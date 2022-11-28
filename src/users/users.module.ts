import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { usersProviders } from './user.provider';

@Module({
  providers: [UsersResolver, UsersService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}
