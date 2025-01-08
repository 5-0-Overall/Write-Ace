import { Module } from '@nestjs/common';
import { GradingController } from './grading.controller';
import { GradingService } from './grading.service';
import { SubmissionModule } from '../submission/submission.module';
import { ContributionModule } from '../contribution/contribution.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [SubmissionModule,ContributionModule,NotificationModule],
  providers: [GradingService],
  controllers: [GradingController],
})
export class GradingModule {}
