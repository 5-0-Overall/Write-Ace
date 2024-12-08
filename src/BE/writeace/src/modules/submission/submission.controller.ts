import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { SubmissionService } from "./submission.service";
import { SubmissionEntity } from "./entity/submission.entity";
import { SubmissionCreateDTO } from "./dto/submission.dto.request";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ContributionService } from "../contribution/contribution.service";



@ApiTags('submission')
@Controller('submissions')
@UseInterceptors(ClassSerializerInterceptor)  
export class SubmissionController {
  constructor(private submissionService: SubmissionService,private contributionService: ContributionService) {}

  @Get()
  async getAllSubmissions(): Promise<SubmissionEntity[]> {
    return this.submissionService.getAllSubmissions();
  }

  @Get(':id')
  async getSubmissionById(@Param('id') id: number): Promise<SubmissionEntity> {
    return this.submissionService.getSubmissionById(id);
  }

  @Post()
  async createSubmission(@Body() submission: SubmissionCreateDTO): Promise<SubmissionEntity> {
    this.contributionService.incrementContribution(submission.user);
    return this.submissionService.createSubmission(submission);
  }

  @Put(':id')
  async updateSubmission(
    @Param('id') id: number,
    @Body() submission: SubmissionEntity
  ): Promise<SubmissionEntity> {
    return this.submissionService.updateSubmission(id, submission);
  }

  @Delete(':id')
  async deleteSubmission(@Param('id') id: number): Promise<void> {
    return this.submissionService.deleteSubmission(id);
  }
}