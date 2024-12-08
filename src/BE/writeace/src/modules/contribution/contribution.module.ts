import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContributionEntity } from './entity/contribution.entity';

import { AuthModule } from '../auth/auth.module';
import { ContributionService } from './contribution.service';
import { ContributionController } from './contribution.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContributionEntity]),
    UserModule,
    AuthModule,
  ],
  providers: [ContributionService],
  controllers: [ContributionController],
  exports: [ContributionService],
})
export class ContributionModule {}