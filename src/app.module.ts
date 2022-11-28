import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { RepoModule } from './repo/repo.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql/error';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error?.message,
        };
        return graphQLFormattedError[0] || graphQLFormattedError;
      },
      autoSchemaFile: 'schema.gql',
      path: `${process.env.API_BASE_PATH}/graphql`,
      context: ({ req }) => ({ req }),
      debug: false,
      playground: true,
      cors: [
        {
          origin: ['http://localhost:3000', process.env.FRONTEND_URL],
        },
      ],
    }),
    UsersModule,
    AuthModule,
    RepoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
