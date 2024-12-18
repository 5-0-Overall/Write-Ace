import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { GetProblemsQuery } from './dto/problem.query';
import { ProblemService } from './problem.service';
import { ApiOperation, ApiQuery, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../guard/auth.guard';
@ApiTags('problem')
@Controller('problems')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Get()
  @ApiOperation({ summary: 'Get problems by query' })
  //example: /problem?task=1&tagName=Bar Chart&limit=10&offset=0
  async getProblems(@Query() query: GetProblemsQuery)  {
    console.log('Incoming query:', query); // Log the incoming query for debugging
    return this.problemService.getProblems(query);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get problem by id' })
  async getProblemById(@Param('id') id: number) {
    return this.problemService.getProblemById(id);
  }

 
}

