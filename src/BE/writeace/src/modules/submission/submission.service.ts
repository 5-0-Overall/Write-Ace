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
import { UpdateSubmissionDto } from './dto/update-submission.dto';

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
    return this.submissionRepository.find({
      relations: ['problem']
    });
  }

  async getSubmissionById(id: number): Promise<SubmissionEntity> {
    return this.submissionRepository.findOne({ 
        where: { id },
        relations: ['problem']
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
        submission.imageBase64
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
      status === STATUS.PENDING
        ? STATUS.REVIEWED
        : status;

    const savedSubmission = await this.submissionRepository.save(updatedSubmission);
    
    return await this.submissionRepository.findOne({
        where: { id: savedSubmission.id },
        relations: {
            problem: true,
        }
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
    return this.submissionRepository.find({
      where: { user: { id: userId } },
      relations: ['problem']
    });
  }

  async getPendingSubmissions(): Promise<SubmissionEntity[]> {
    return this.submissionRepository.find({
      where: { status: STATUS.PENDING },
      relations: ['problem']
    });
  }

  async save(submit : SubmissionEntity){
    return this.submissionRepository.save(submit);
  }

  async updateTeacherReview(
    id: number,
    updateSubmissionDto: UpdateSubmissionDto,
  ): Promise<SubmissionEntity> {
    const submission = await this.submissionRepository.findOne({
      where: { id },
      relations: ['problem'],
    });

    if (!submission) {
      throw new NotFoundException(`Submission with ID ${id} not found`);
    }

    if (updateSubmissionDto.teacherReview !== undefined) {
      submission.teacherReview = updateSubmissionDto.teacherReview;
    }
    if (updateSubmissionDto.scoreTA !== undefined) {
      submission.scoreTA = updateSubmissionDto.scoreTA;
    }
    if (updateSubmissionDto.scoreCC !== undefined) {
      submission.scoreCC = updateSubmissionDto.scoreCC;
    }
    if (updateSubmissionDto.scoreLR !== undefined) {
      submission.scoreLR = updateSubmissionDto.scoreLR;
    }
    if (updateSubmissionDto.scoreGRA !== undefined) {
      submission.scoreGRA = updateSubmissionDto.scoreGRA;
    }
    if (updateSubmissionDto.scoreOVR !== undefined) {
      submission.scoreOVR = updateSubmissionDto.scoreOVR;
    }
    if (updateSubmissionDto.status !== undefined) {
      submission.status = updateSubmissionDto.status;
    }

    const savedSubmission = await this.submissionRepository.save(submission);
    
    return await this.submissionRepository.findOne({
      where: { id: savedSubmission.id },
      relations: ['problem'],
    });
  }


  async manualRequestSubmission(submission: SubmissionCreateDTO): Promise<SubmissionEntity> {
    const problem = await this.problemRepository.findOneBy({
      id: submission.problem,
    });
    const user = await this.userRepository.findOneBy({ id: submission.user });
    const essay = submission.essay;

    const submissionEntity : SubmissionEntity = {
      id: null,
      problem: problem,
      user: user,
      essay: essay,
      status: STATUS.PENDING,
      aiReview: null,
      teacherReview: null,
      scoreTA: 0,
      scoreCC: 0,
      scoreLR: 0,
      scoreGRA: 0,
      scoreOVR: 0,
      created_at: new Date(),
      updated_at: new Date(),
    } 
    return this.submissionRepository.save(submissionEntity);
  }
}
