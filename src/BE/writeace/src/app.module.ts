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


@Module({
  imports: [UserModule, TagModule, SubmissionModule, ProfileModule, ProblemModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '300604',
      database: 'write_ace',
      entities: [__dirname + '/**/*.entity.{ts,js}'],  // Adjusted path for entities
      synchronize: true,
    }),
    BaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
