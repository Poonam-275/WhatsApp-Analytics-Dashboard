import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { loadEnv } from '../config/env';
import { User } from '../entities/user.entity';
import { Message } from '../entities/message.entity';
import { Campaign } from '../entities/campaign.entity';
import { Reply } from '../entities/reply.entity';

const env = loadEnv();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.database.host,
  port: env.database.port,
  username: env.database.user,
  password: env.database.password,
  database: env.database.name,
  entities: [User, Message, Campaign, Reply],
  migrations: ['dist/database/migrations/*.js'],
});
