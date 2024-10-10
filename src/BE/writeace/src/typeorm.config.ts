import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '300604',
  database: 'write_ace',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
