import { Controller, Get, Param } from "@nestjs/common";
import { AnalysticService } from "./analystic.service";
import { SubmissionService } from "../submission/submission.service";
import { AnalysticUserDTO } from "./dto/analystic-user.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Analystic')
@Controller('analystic')
export class AnalysticController {
  constructor(
    private readonly analysticService: AnalysticService,
    private readonly submissionService: SubmissionService,
  ) {}

  @Get('user/:userId')
  async analysticUserSubmission(
    @Param('userId') userId: number,
  ): Promise<AnalysticUserDTO> {
    return this.submissionService.analysticUserSubmission(userId);
  }
}
