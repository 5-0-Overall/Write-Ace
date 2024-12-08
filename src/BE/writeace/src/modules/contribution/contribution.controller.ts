import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { ApiOperation, ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { ContributionService } from './contribution.service';

@ApiTags('contributions')
@Controller('contributions')
@UseGuards(AuthGuard)
export class ContributionController {
  constructor(private readonly contributionService: ContributionService) {}

  @Get('/me')
  @ApiOperation({ summary: 'Get user contributions' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'year', type: Number, required: false })
  async getUserContributions(@Req() req: any, @Query('year') year?: number) {
    return this.contributionService.getContributionsByUserId(req.user.id, year);
  }
}