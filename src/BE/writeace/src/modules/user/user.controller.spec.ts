// import { Test, TestingModule } from '@nestjs/testing';
// import { UserController } from './user.controller';

// describe('UserController', () => {
//   let controller: UserController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UserController],
//     }).compile();

//     controller = module.get<UserController>(UserController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { SignInUserDto } from './dto/request/signin-user.dto';
import { ProfileEntity } from './entity/profile.entity';
import { UserEntity } from './entity/user.entity';
import {
  UpdateProfileDto,
  UpdateProfileWithFileDto,
} from './dto/request/update-user.dto';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../guard/auth.guard'; // Adjust import path
import { Reflector } from '@nestjs/core';

describe('UserController', () => {
  let controller: UserController;
  let mockUserService: Partial<UserService>;

  const mockCreateUserDto: CreateUserDto = {
    username: 'username01',
    email: 'user01@gmail.com',
    password: 'password01',
  };

  const mockSignInUserDto: SignInUserDto = {
    username: 'username01',
    password: 'password01',
  };

  const mockUpdateProfileDto: UpdateProfileDto = {
    email: 'updated@example.com',
    password: 'newpassword123',
    avatar: 'https://example.com/new-avatar.jpg',
    description: 'Updated user description',
  };

  const mockUpdateProfileWithFileDto: UpdateProfileWithFileDto = {
    ...mockUpdateProfileDto,
    avatarFile: {
      fieldname: 'avatarFile',
      originalname: 'avatar.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: './uploads',
      filename: 'avatar-123.jpg',
      path: './uploads/avatar-123.jpg',
      size: 1024,
    } as Express.Multer.File,
  };

  beforeEach(async () => {
    mockUserService = {
      create: jest.fn().mockResolvedValue({
        id: 1,
        ...mockCreateUserDto,
      }),
      login: jest.fn().mockResolvedValue({
        access_token: 'mock_token',
      }),
      getCurrentUser: jest.fn().mockResolvedValue({
        id: 1,
        username: 'username01',
        email: 'user01@gmail.com',
      }),
      updateUser: jest.fn().mockResolvedValue({
        id: 1,
        ...mockUpdateProfileDto,
      }),
      updateProfile: jest.fn().mockResolvedValue({
        id: 1,
        email: 'updated@example.com',
        description: 'Updated user description',
        avatar: 'https://example.com/new-avatar.jpg',
      }),
      findAll: jest.fn().mockResolvedValue([]),
      toggleUserEnabled: jest.fn().mockResolvedValue({}),
      updateUserRole: jest.fn().mockResolvedValue({}),
    };

    const mockUserEntityRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: 'UserEntityRepository', // Thêm mock repository
          useValue: mockUserEntityRepository,
        },
        {
          provide: Reflector, // Thêm Reflector
          useValue: {
            get: jest.fn(),
            getAllAndMerge: jest.fn(),
            getAllAndOverride: jest.fn(),
          },
        },
        {
          provide: AuthGuard, // Cung cấp mock cho AuthGuard
          useValue: {
            canActivate: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('updateCurrentUser', () => {
    it('should update current user with file', async () => {
      const mockRequest = {
        user: { id: 1, email: 'user01@gmail.com' },
      };

      const result = await controller.updateCurrentUser(
        mockRequest,
        mockUpdateProfileDto,
        mockUpdateProfileWithFileDto.avatarFile,
      );

      expect(result).toEqual({
        user: {
          id: 1,
          email: 'updated@example.com',
          password: 'newpassword123',
          avatar: 'https://example.com/new-avatar.jpg',
          description: 'Updated user description',
        },
        profile: {
          id: 1,
          email: 'updated@example.com',
          description: 'Updated user description',
          avatar: 'https://example.com/new-avatar.jpg',
        },
      });

      expect(mockUserService.updateUser).toHaveBeenCalledWith(
        1,
        mockUpdateProfileDto,
      );
      expect(mockUserService.updateProfile).toHaveBeenCalledWith(
        1,
        mockUpdateProfileDto,
        mockUpdateProfileWithFileDto.avatarFile,
      );
    });
  });

  describe('getUsers', () => {
    it('should return list of users', async () => {
      const result = await controller.getUsers();
      expect(result).toEqual([]);
      expect(mockUserService.findAll).toHaveBeenCalled();
    });
  });

  describe('toggleUserEnabled', () => {
    it('should toggle user enabled status', async () => {
      const result = await controller.toggleUserEnabled(1);
      expect(result).toEqual({});
      expect(mockUserService.toggleUserEnabled).toHaveBeenCalledWith(1);
    });
  });

  describe('updateUserRole', () => {
    it('should update user role', async () => {
      const result = await controller.updateUserRole(1, 2);
      expect(result).toEqual({});
      expect(mockUserService.updateUserRole).toHaveBeenCalledWith(1, 2);
    });
  });
});
