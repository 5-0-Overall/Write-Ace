import { ApiProperty } from '@nestjs/swagger';

export class OpenAIUpdateSubmissionDTO {
  @ApiProperty({ description: 'The ID of the submission to update' })
  submissionId: number;
  @ApiProperty({ description: 'The AI review of the submission' })
  aiReview: string;
  @ApiProperty({ description: 'The score of Task Ahievement submission' })
  scoreTA: number;
  @ApiProperty({ description: 'The score of Coherence & Cohesion submission' })
  scoreCC: number;
  @ApiProperty({ description: 'The score of Lexical Resources submission' })
  scoreLR: number;
  @ApiProperty({
    description: 'The score of Grammar Range and Accuracy submission',
  })
  scoreGRA: number;
  @ApiProperty({ description: 'The score of Overall submission' })
  scoreOVR: number;
}
