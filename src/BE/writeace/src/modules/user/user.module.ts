import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { S3Module } from '../s3/s3.module';
import { ProfileEntity } from './entity/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ProfileEntity]),
    AuthModule,
    S3Module
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[TypeOrmModule,UserService]
})
export class UserModule {}
