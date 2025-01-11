import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionService } from './submission.service';
import { SubmissionCreateDTO } from './dto/submission.dto.request';
import { SubmissionEntity } from './entity/submission.entity';
import { ProblemEntity } from '../problem/entity/problem.entity';
import { UserEntity } from '../user/entity/user.entity';
import { OpenAIService } from '../openai/openai.service';
import { STATUS } from '../const/enum/status.enum';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('SubmissionService', () => {
  let service: SubmissionService;
  let submissionRepository: Partial<Repository<SubmissionEntity>>;
  let problemRepository: Partial<Repository<ProblemEntity>>;
  let userRepository: Partial<Repository<UserEntity>>;
  let openAIService: Partial<OpenAIService>;

  beforeEach(async () => {
    // Mock repositories and services
    submissionRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
    };

    problemRepository = {
      findOneBy: jest.fn(),
    };

    userRepository = {
      findOneBy: jest.fn(),
    };

    openAIService = {
      generateText: jest.fn(),
      generateTextWithImage: jest.fn(),
      getScoreTA: jest.fn(),
      getScoreCC: jest.fn(),
      getScoreLR: jest.fn(),
      getScoreGRA: jest.fn(),
      getScoreOVR: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubmissionService,
        {
          provide: 'SubmissionEntityRepository',
          useValue: submissionRepository,
        },
        {
          provide: 'ProblemEntityRepository',
          useValue: problemRepository,
        },
        {
          provide: 'UserEntityRepository',
          useValue: userRepository,
        },
        {
          provide: OpenAIService,
          useValue: openAIService,
        },
      ],
    }).compile();

    service = module.get<SubmissionService>(SubmissionService);
  });

  // Test Case 1: Problem not found
  it('should throw NotFoundException when problem does not exist', async () => {
    const createDto: SubmissionCreateDTO = {
      problem: 999,
      user: 1,
      essay: 'Test Essay',
    };

    problemRepository.findOneBy = jest.fn().mockResolvedValue(null);

    await expect(service.createSubmission(createDto)).rejects.toThrow(
      NotFoundException,
    );
  });

  // Test Case 2: User not found
  it('should throw NotFoundException when user does not exist', async () => {
    const mockProblem = { id: 1, description: 'Test Problem' } as ProblemEntity;
    const createDto: SubmissionCreateDTO = {
      problem: 1,
      user: 999,
      essay: 'Test Essay',
    };

    problemRepository.findOneBy = jest.fn().mockResolvedValue(mockProblem);
    userRepository.findOneBy = jest.fn().mockResolvedValue(null);

    await expect(service.createSubmission(createDto)).rejects.toThrow(
      NotFoundException,
    );
  });
});

describe('SubmissionService - analysticUserSubmission', () => {
  let service: SubmissionService;
  let userRepository: any;
  let submissionRepository: any;
  let problemRepository: any;
  let openAIService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubmissionService,
        {
          provide: 'UserEntityRepository',
          useValue: {
            findOneBy: jest.fn(),
          },
        },
        {
          provide: 'SubmissionEntityRepository',
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: 'ProblemEntityRepository',
          useValue: {
            findOneBy: jest.fn(),
          },
        },
        {
          provide: OpenAIService,
          useValue: {
            // Mock các phương thức của OpenAIService nếu cần
            generateText: jest.fn(),
            generateTextWithImage: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SubmissionService>(SubmissionService);
    userRepository = module.get('UserEntityRepository');
    submissionRepository = module.get('SubmissionEntityRepository');
    problemRepository = module.get('ProblemEntityRepository');
    openAIService = module.get<OpenAIService>(OpenAIService);
  });

  // Test Case 1: Successful analysis with multiple submissions
  it('should return user submission analytics', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
    } as UserEntity;

    const mockProblem1 = {
      id: 1,
      description: 'Problem 1',
    } as ProblemEntity;

    const mockProblem2 = {
      id: 2,
      description: 'Problem 2',
    } as ProblemEntity;

    const mockSubmissions: SubmissionEntity[] = [
      {
        id: 1,
        user: mockUser,
        problem: mockProblem1,
        essay: 'First essay with some words',
        scoreOVR: 7,
      },
      {
        id: 2,
        user: mockUser,
        problem: mockProblem2,
        essay: 'Second essay with more words',
        scoreOVR: 9,
      },
    ] as SubmissionEntity[];

    // Mock user repository
    userRepository.findOneBy.mockResolvedValue(mockUser);

    // Mock submission repository
    submissionRepository.find.mockResolvedValue(mockSubmissions);

    // Execute the method
    const result = await service.analysticUserSubmission(1);

    // Assertions
    expect(result).toBeDefined();
    expect(result.user_id).toBe(1);
    expect(result.total_submission).toBe(2);
    expect(result.total_essay).toBe(2);
    expect(result.total_word).toBe(
      'First essay with some words'.length +
        'Second essay with more words'.length,
    );
    expect(result.average_score).toBe((7 + 9) / 2);
    expect(result.highest_score).toBe(9);

    // Verify method calls
    expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(submissionRepository.find).toHaveBeenCalledWith({
      where: { user: { id: 1 } },
      relations: { problem: true, user: true },
    });
  });

  // Test Case 3: User with no submissions
  it('should return zero values when user has no submissions', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
    } as UserEntity;

    // Mock user repository
    userRepository.findOneBy.mockResolvedValue(mockUser);

    // Mock submission repository with empty array
    submissionRepository.find.mockResolvedValue([]);

    // Execute the method
    const result = await service.analysticUserSubmission(1);

    // Assertions
    expect(result).toBeDefined();
    expect(result.user_id).toBe(1);
    expect(result.total_submission).toBe(0);
    expect(result.total_essay).toBe(0);
    expect(result.total_word).toBe(0);
    expect(result.average_score).toBe(0);
    expect(result.highest_score).toBe(0);
  });
});
