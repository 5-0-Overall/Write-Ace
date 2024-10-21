import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TagModule } from './modules/tag/tag.module';
import { SubmissionModule } from './modules/submission/submission.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ProblemModule } from './modules/problem/problem.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from './modules/base/base.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    TagModule,
    SubmissionModule,
    ProfileModule,
    ProblemModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity.{ts,js}'],
        autoLoadEntities: true,
        logging: true,
        synchronize: true, // Chỉ nên dùng trong môi trường development
      }),
      inject: [ConfigService],
    }),
    BaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}