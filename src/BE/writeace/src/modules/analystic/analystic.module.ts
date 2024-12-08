import { Module } from '@nestjs/common';
import { AnalysticService } from './analystic.service';
import { AnalysticController } from './analystic.controller';
import { SubmissionModule } from '../submission/submission.module';

@Module({
    imports: [SubmissionModule  ],
  controllers: [AnalysticController],
  providers: [AnalysticService],
})
export class AnalysticModule {}

