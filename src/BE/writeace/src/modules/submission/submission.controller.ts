import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SubmissionService } from "./submission.service";
import { SubmissionEntity } from "./entity/submission.entity";
import { SubmissionCreateDTO } from "./dto/submission.dto.request";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';



@ApiTags('submission')
@Controller('submissions')
export class SubmissionController {
  constructor(private submissionService: SubmissionService) {}

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