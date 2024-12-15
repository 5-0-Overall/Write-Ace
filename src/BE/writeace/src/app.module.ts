import { MiddlewareConsumer, Module, OnModuleInit } from '@nestjs/common';
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
import { AdminInitializerService } from './modules/user/admin/admin-initializer.service';
import { LoggerMiddleware } from './modules/middleware/logger.middleware';
import { OpenAIModule } from './modules/openai/openai.module';
import { ContributionModule } from './modules/contribution/contribution.module';
import { AnalysticModule } from './modules/analystic/analystic.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/guard/auth.guard';
import { RolesGuard } from './modules/guard/role.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';

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
        synchronize: false, // Only use in development environment
        retryAttempts: +configService.get('DATABASE_RETRY_ATTEMPTS', 10),
        retryDelay: +configService.get('DATABASE_RETRY_DELAY', 3000),
      }),
      inject: [ConfigService],
    }),
    OpenAIModule,
    BaseModule,
    ContributionModule,
    AnalysticModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AdminInitializerService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements OnModuleInit {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
  async onModuleInit() {
    try {
      console.log('AppModule initializing...');
      // await this.adminInitializer.onModuleInit();  // Có thể gọi trực tiếp nếu cần
      console.log('AppModule initialized');
    } catch (error) {
      console.error('Error initializing AppModule:', error);
    }
  }
}
