import { DataSource } from 'typeorm';
import { pg_config } from '../../modules/auth/controllers/env.loader';
import { Users } from './dbmodels/Users';
import { Books } from './dbmodels/Books';
import { BooksPages } from './dbmodels/BooksPages';
import { Subscriptions } from './dbmodels/Subscriptions';
import { Purchases } from './dbmodels/Purchases';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: pg_config.host,
  port: pg_config.port,
  username: pg_config.username,
  password: pg_config.password,
  database: pg_config.database,
  synchronize: true,
  logging: true,
  entities: [
    Users, 
    Books, 
    BooksPages, 
    Subscriptions, 
    Purchases
  ],
  migrations: [
    __dirname + '/migration/**/*.ts'
  ],
  subscribers: [
    __dirname + '/subscriber/**/*.ts'
  ]
});