import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from 'express';
import { AnalysticService } from "./analystic.service";
import { SubmissionService } from "../submission/submission.service";
import { AnalysticUserDTO } from "./dto/analystic-user.dto";
import { ApiTags } from "@nestjs/swagger";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "../guard/auth.guard";

@ApiTags('Analystic')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('analystic')
export class AnalysticController {
  constructor(
    private readonly analysticService: AnalysticService,
    private readonly submissionService: SubmissionService,
  ) {}

  @Get('user')
  async analysticUserSubmission(
    @Req() req: RequestWithUser
  ): Promise<AnalysticUserDTO> {
    const userId = req.user.id;
    return this.submissionService.analysticUserSubmission(userId);
  }
}
