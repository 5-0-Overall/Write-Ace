import { Controller, Get, Query } from '@nestjs/common';
import { GetProblemsQuery } from './dto/problem.query';
import { ProblemService } from './problem.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('problem')
@Controller('problems')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Get()
  @ApiOperation({ summary: 'Get problems by query' })
  //example: /problem?task=1&tagName=Bar Chart&limit=10&offset=0
  async getProblems(@Query() query: GetProblemsQuery)  {
    console.log('Incoming query:', query); // Log the incoming query for debugging
    return this.problemService.getProblems(query);
  }

 
}
