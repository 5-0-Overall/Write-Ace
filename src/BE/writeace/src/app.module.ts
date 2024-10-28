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
        synchronize: false, // Chỉ nên dùng trong môi trường development
        retryAttempts: +configService.get('DATABASE_RETRY_ATTEMPTS', 10),
        retryDelay: +configService.get('DATABASE_RETRY_DELAY', 3000),
      }),
      inject: [ConfigService],
    }),
    BaseModule,
  ],
  controllers: [AppController],
  providers: [AppService,AdminInitializerService],
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