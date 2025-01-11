import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { ContributionService } from '../contribution/contribution.service';
import { AuthGuard } from '../guard/auth.guard';
import { SubmissionCreateDTO } from './dto/submission.dto.request';
import { SubmissionEntity } from './entity/submission.entity';
import { STATUS } from '../const/enum/status.enum';
import { UserEntity } from '../user/entity/user.entity';
import { ProblemEntity } from '../problem/entity/problem.entity';

const mockUserEntityRepository = {
  findOne: jest.fn(),
  findBy: jest.fn(),
};
describe('SubmissionController', () => {
  let controller: SubmissionController;
  let mockSubmissionService: Partial<SubmissionService>;
  let mockContributionService: Partial<ContributionService>;
  let mockJwtService: Partial<JwtService>;
  let mockReflector: Partial<Reflector>;

  beforeEach(async () => {
    // Mock services
    mockSubmissionService = {
      createSubmission: jest.fn(),
    };

    mockContributionService = {
      incrementContribution: jest.fn(),
    };

    mockJwtService = {
      verify: jest.fn(),
      sign: jest.fn(),
    };

    mockReflector = {
      get: jest.fn(),
      getAllAndMerge: jest.fn(),
      getAllAndOverride: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmissionController],
      providers: [
        {
          provide: SubmissionService,
          useValue: mockSubmissionService,
        },
        {
          provide: ContributionService,
          useValue: mockContributionService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: Reflector,
          useValue: mockReflector,
        },
        {
          provide: 'UserEntityRepository',
          useValue: mockUserEntityRepository,
        },
        {
          provide: AuthGuard,
          useValue: {
            canActivate: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<SubmissionController>(SubmissionController);
  });

  // Test Case 1: Successful submission without image
  it('should create submission successfully', async () => {
    const mockProblem = { id: 1, description: 'Test Problem' } as ProblemEntity;
    const mockUser = { id: 1 } as UserEntity;
    const mockSubmission = {
      id: 1,
      problem: mockProblem,
      user: mockUser,
      essay: 'Test Essay',
      status: STATUS.REVIEWED,
      scoreTA: 8,
      scoreCC: 7,
      scoreLR: 6,
      scoreGRA: 9,
      scoreOVR: 7,
      aiReview: 'AI Review',
    } as SubmissionEntity;

    const createDto: SubmissionCreateDTO = {
      problem: 1,
      user: 1,
      essay: 'Test Essay',
    };

    // Mock service methods
    jest
      .spyOn(mockSubmissionService, 'createSubmission')
      .mockResolvedValue(mockSubmission);
    jest
      .spyOn(mockContributionService, 'incrementContribution')
      .mockImplementation();

    const result = await controller.createSubmission(createDto);

    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(result.status).toBe(STATUS.REVIEWED);
    expect(mockContributionService.incrementContribution).toHaveBeenCalledWith(
      createDto.user,
    );
    expect(mockSubmissionService.createSubmission).toHaveBeenCalledWith(
      createDto,
    );
  });

  // Test Case 2: Submission with image
  it('should create submission with image successfully', async () => {
    const mockProblem = { id: 1, description: 'Test Problem' } as ProblemEntity;
    const mockUser = { id: 1 } as UserEntity;
    const mockSubmission = {
      id: 1,
      problem: mockProblem,
      user: mockUser,
      essay: 'Test Essay',
      status: STATUS.REVIEWED,
      scoreTA: 8,
      scoreCC: 7,
      scoreLR: 6,
      scoreGRA: 9,
      scoreOVR: 7,
      aiReview: 'AI Review',
    } as SubmissionEntity;

    const createDto: SubmissionCreateDTO = {
      problem: 1,
      user: 1,
      essay: 'Test Essay',
      imageBase64: 'base64image',
    };

    // Mock service methods
    jest
      .spyOn(mockSubmissionService, 'createSubmission')
      .mockResolvedValue(mockSubmission);
    jest
      .spyOn(mockContributionService, 'incrementContribution')
      .mockImplementation();

    const result = await controller.createSubmission(createDto);

    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(result.status).toBe(STATUS.REVIEWED);
    expect(mockContributionService.incrementContribution).toHaveBeenCalledWith(
      createDto.user,
    );
    expect(mockSubmissionService.createSubmission).toHaveBeenCalledWith(
      createDto,
    );
  });

  // Test Case 3: Submission creation fails
  it('should handle submission creation failure', async () => {
    const createDto: SubmissionCreateDTO = {
      problem: 1,
      user: 1,
      essay: 'Test Essay',
    };

    // Mock service methods to throw an error
    jest
      .spyOn(mockSubmissionService, 'createSubmission')
      .mockRejectedValue(new Error('Submission creation failed'));
    jest
      .spyOn(mockContributionService, 'incrementContribution')
      .mockImplementation();

    await expect(controller.createSubmission(createDto)).rejects.toThrow(
      'Submission creation failed',
    );

    expect(mockContributionService.incrementContribution).toHaveBeenCalledWith(
      createDto.user,
    );
  });

  // Test Case 4: Validate input data
  it('should validate submission input data', async () => {
    const invalidDto: SubmissionCreateDTO = {
      problem: 1,
      user: 1,
      essay: '',
    };

    jest
      .spyOn(mockSubmissionService, 'createSubmission')
      .mockImplementation(() => {
        throw new BadRequestException('Essay cannot be empty');
      });

    await expect(controller.createSubmission(invalidDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  // Test Case 5: Validate input data
  it('should validate submission input data', async () => {
    const invalidDto: SubmissionCreateDTO = {
      problem: null,
      user: null,
      essay: '',
    };

    jest
      .spyOn(mockSubmissionService, 'createSubmission')
      .mockImplementation(() => {
        throw new NotFoundException('Problem or user not found');
      });

    await expect(controller.createSubmission(invalidDto)).rejects.toThrow(
      NotFoundException,
    );
  });

  // Test Case 6: Check contribution increment
  it('should increment contribution for user', async () => {
    const createDto: SubmissionCreateDTO = {
      problem: 1,
      user: 1,
      essay: 'Test Essay',
    };

    const mockSubmission = {
      id: 1,
      problem: { id: 1 },
      user: { id: 1 },
      essay: 'Test Essay',
      status: STATUS.REVIEWED,
    } as SubmissionEntity;

    jest
      .spyOn(mockSubmissionService, 'createSubmission')
      .mockResolvedValue(mockSubmission);
    const incrementSpy = jest
      .spyOn(mockContributionService, 'incrementContribution')
      .mockImplementation();

    await controller.createSubmission(createDto);

    expect(incrementSpy).toHaveBeenCalledWith(createDto.user);
    expect(incrementSpy).toHaveBeenCalledTimes(1);
  });
});
