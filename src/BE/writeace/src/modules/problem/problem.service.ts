import { Injectable } from '@nestjs/common';
import { ProblemEntity } from './entity/problem.entity';
import { In, IsNull, Repository } from 'typeorm';
import { GetProblemsQuery } from './dto/problem.query';
import { TagService } from '../tag/tag.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProblemService {
    constructor(
        @InjectRepository(ProblemEntity)
        private readonly problemRepository: Repository<ProblemEntity>,
        private readonly tagService: TagService
    ) {}
    async getProblems(query: GetProblemsQuery) {
        const { task, tagName, limit, offset } = query;
        if (!task && !tagName) {
            return this.getAllProblems();
        }
        if(!tagName) {
            return this.getProblemsByTask(task, limit, offset);
        }
        const tagNameList = tagName.split(',');
        const tag = await this.tagService.findTagByListName(tagNameList);
        const ids = tag.map((tag) => tag.id);

        const problems = await this.problemRepository.find({
            where: {
                task_id: task ? task : IsNull(),
                tags: { id: In(ids) },
            },
            take: limit,
            skip: offset,
        });
        return problems;
    }
    async getAllProblems() {
        return this.problemRepository.find();
    }
    async getProblemsByTask(task: number, limit: number, offset: number) {
        return this.problemRepository.find({
            where: { task_id: task },
            take: limit,
            skip: offset,
        });
    }
}