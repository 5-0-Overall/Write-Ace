import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmissionEntity } from './entity/submission.entity';
import { Repository } from 'typeorm';
import { SubmissionCreateDTO } from './dto/submission.dto.request';
import { ProblemEntity } from '../problem/entity/problem.entity';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(SubmissionEntity)
    private submissionRepository: Repository<SubmissionEntity>,
    @InjectRepository(ProblemEntity)
    private problemRepository: Repository<ProblemEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAllSubmissions(): Promise<SubmissionEntity[]> {
    return this.submissionRepository.find();
  }

  async getSubmissionById(id: number): Promise<SubmissionEntity> {
    return this.submissionRepository.findOneBy({ id });
  }

  async createSubmission(
    submission: SubmissionCreateDTO,
  ): Promise<SubmissionEntity> {
    const problem = await this.problemRepository.findOneBy({
      id: submission.problem,
    });
    const user = await this.userRepository.findOneBy({ id: submission.user });
    const essay = submission.essay;
    if (!problem || !user) {
      throw new NotFoundException('Problem or user not found');
    }

    const newSubmission = this.submissionRepository.create({
      problem,
      user,
      essay
    });

    await this.submissionRepository.save(newSubmission);
    return newSubmission;
  }

  async updateSubmission(
    id: number,
    submission: SubmissionEntity,
  ): Promise<SubmissionEntity> {
    await this.submissionRepository.update(id, submission);
    return this.submissionRepository.findOneBy({ id });
  }

  async deleteSubmission(id: number): Promise<void> {
    await this.submissionRepository.delete(id);
  }
}
