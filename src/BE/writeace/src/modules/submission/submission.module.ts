
import { Module } from '@nestjs/common';
import { SubmissionEntity } from './entity/submission.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { ProblemModule } from '../problem/problem.module';
import { UserModule } from '../user/user.module';
import { ContributionModule } from '../contribution/contribution.module';

@Module({
  imports: [TypeOrmModule.forFeature([SubmissionEntity]),ProblemModule,UserModule,ContributionModule],
  controllers: [SubmissionController],
  providers: [SubmissionService],
  exports:[SubmissionService,TypeOrmModule]
})
export class SubmissionModule {}

