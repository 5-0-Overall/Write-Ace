import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  UseGuards,
  Delete,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { GetProblemsQuery } from './dto/problem.query';
import { ProblemService } from './problem.service';
import {
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '../guard/auth.guard';
import { CreateProblemDto } from './dto/create-problem.dto';
@ApiTags('problem')
@Controller('problems')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Get()
  @ApiOperation({ summary: 'Get problems by query' })
  //example: /problem?task=1&tagName=Bar Chart&limit=10&offset=0
  async getProblems(@Query() query: GetProblemsQuery) {
    console.log('Incoming query:', query); // Log the incoming query for debugging
    return this.problemService.getProblems(query);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get problem by id' })
  async getProblemById(@Param('id') id: number) {
    return this.problemService.getProblemById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new problem' })
  async createProblem(@Body() createProblemDto: CreateProblemDto) {
    return this.problemService.createProblem(createProblemDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a problem by id' })
  async deleteProblem(@Param('id') id: number) {
    if (!id || isNaN(id)) {
      throw new BadRequestException('Invalid ID provided');
    }
    return this.problemService.deleteProblem(id);
  }
}
