import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemEntity } from './entity/problem.entity';
import { ProblemController } from './problem.controller';
import { ProblemService } from './problem.service';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProblemEntity]), TagModule],
  controllers: [ProblemController],
  providers: [ProblemService],
  exports: [ProblemService, TypeOrmModule],
})
export class ProblemModule {}
