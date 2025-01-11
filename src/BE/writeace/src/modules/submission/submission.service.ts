import { Test, TestingModule } from '@nestjs/testing';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmissionEntity } from './entity/submission.entity';
import { Repository } from 'typeorm';
import { SubmissionCreateDTO } from './dto/submission.dto.request';
import { ProblemEntity } from '../problem/entity/problem.entity';
import { UserEntity } from '../user/entity/user.entity';
import { AnalysticUserDTO } from '../analystic/dto/analystic-user.dto';
import { OpenAIUpdateSubmissionDTO } from './dto/openai.update.submission.dto';
import { OpenAIService } from '../openai/openai.service';
import { STATUS } from '../const/enum/status.enum';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(SubmissionEntity)
    private submissionRepository: Repository<SubmissionEntity>,
    @InjectRepository(ProblemEntity)
    private problemRepository: Repository<ProblemEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private openaiService: OpenAIService,
  ) {}

  async getAllSubmissions(): Promise<SubmissionEntity[]> {
    return this.submissionRepository.find();
  }

  async getSubmissionById(id: number): Promise<SubmissionEntity> {
    return this.submissionRepository.findOne({
      where: { id },
      relations: ['problem', 'user'],
    });
  }

  async updateSubmission(
    openaiUpdateSubmissionDTO: OpenAIUpdateSubmissionDTO,
  ): Promise<SubmissionEntity> {
    const submission = await this.submissionRepository.findOneBy({
      id: openaiUpdateSubmissionDTO.submissionId,
    });
    if (!submission) {
      throw new NotFoundException('Submission not found');
    }

    return this.submissionRepository.save({
      ...submission,
      ...openaiUpdateSubmissionDTO,
    });
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
      essay,
    });

    await this.submissionRepository.save(newSubmission);

    let aiReview: string;
    if (submission.imageBase64) {
      aiReview = await this.openaiService.generateTextWithImage(
        problem.description,
        essay,
        submission.imageBase64,
      );
    } else {
      aiReview = await this.openaiService.generateText(
        problem.description,
        essay,
      );
    }

    const scoreTA = this.openaiService.getScoreTA(aiReview);
    const scoreCC = this.openaiService.getScoreCC(aiReview);
    const scoreLR = this.openaiService.getScoreLR(aiReview);
    const scoreGRA = this.openaiService.getScoreGRA(aiReview);
    const scoreOVR = this.openaiService.getScoreOVR(aiReview);

    const updatedSubmission = await this.updateSubmission({
      submissionId: newSubmission.id,
      aiReview,
      scoreTA,
      scoreCC,
      scoreLR,
      scoreGRA,
      scoreOVR,
    });

    const status = updatedSubmission.status;
    updatedSubmission.status =
      status === STATUS.PENDING ? STATUS.REVIEWED : status;

    const savedSubmission =
      await this.submissionRepository.save(updatedSubmission);

    return await this.submissionRepository.findOne({
      where: { id: savedSubmission.id },
      relations: {
        problem: true,
      },
    });
  }

  async deleteSubmission(id: number): Promise<void> {
    await this.submissionRepository.delete(id);
  }

  async analysticUserSubmission(userId: number): Promise<AnalysticUserDTO> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const submissions = await this.submissionRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        problem: true,
        user: true,
      },
    });
    const totalSubmission = submissions.length;
    const problem = submissions.map((submission) => submission.problem);
    const totalEssay = problem.length;
    const totalWord = submissions.reduce(
      (acc, curr) => acc + curr.essay.length,
      0,
    );
    const averageScore =
      submissions.reduce((acc, curr) => acc + curr.scoreOVR, 0) / totalEssay;
    const highestScore = Math.max(
      ...submissions.map((submission) => submission.scoreOVR),
    );
    return {
      user_id: user.id,
      total_submission: totalSubmission,
      total_essay: totalEssay,
      total_word: totalWord,
      average_score: averageScore,
      highest_score: highestScore,
    };
  }

  async getSubmissionByUserId(userId: number): Promise<SubmissionEntity[]> {
    return this.submissionRepository.find({ where: { user: { id: userId } } });
  }
  async save(submit: SubmissionEntity) {
    return this.submissionRepository.save(submit);
  }
}
