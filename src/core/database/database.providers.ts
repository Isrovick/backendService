import { Sequelize } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Repo } from '../../repo/entities/repo.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
      });
      sequelize.addModels([User, Repo]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
