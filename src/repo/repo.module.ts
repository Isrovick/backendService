import { Module } from '@nestjs/common';
import { RepoService } from './repo.service';
import { RepoResolver } from './repo.resolver';
import { reposProviders } from './repo.provider';
import { UsersModule } from '../users/users.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UsersModule, HttpModule],
  providers: [RepoResolver, RepoService, ...reposProviders],
})
export class RepoModule {}
