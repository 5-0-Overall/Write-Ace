import { Injectable } from '@nestjs/common';
import { SubmissionService } from '../submission/submission.service';
import { FeedbackResponseEntity } from './entity/response.entity';
import { ContributionService } from '../contribution/contribution.service';
import { NotificationService } from '../notification/notification.service';
import { Notification } from '../notification/entity/notification.entity';
@Injectable()
export class GradingService {
  constructor(
    private readonly submissionService: SubmissionService,
    private readonly contributionService: ContributionService,
    private readonly notificationService: NotificationService,
  ) {}

  async gradeEssay(
    id: number,
    body: FeedbackResponseEntity,
    teacherId: number,
  ) {
    const submission = await this.submissionService.getSubmissionById(id);
    submission.aiReview = JSON.stringify(body);
    await this.submissionService.save(submission);

    const contribution = await this.contributionService.incrementContribution(
      teacherId,
    );
    const notification = new Notification();
    notification.user_id = submission.user.id;
    notification.title = `Your essay has been graded`;
    notification.content =
      'Your essay has been reviewed. Click to see the feedback.';
    notification.is_read = false;
    notification.redirect_url = `http://localhost:3001/result/${submission.id}`;

    await this.notificationService.createNotifications(notification);

    return submission;
  }
}
