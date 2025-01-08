import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Put,
  Req,
  Param,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UniqueUserPipe } from '../pipes/unique-user.pipe';
import { SignInUserDto } from './dto/request/signin-user.dto';
import { AuthGuard } from '../guard/auth.guard';
import { Public } from '../decorator/roles.decorator';
import {
  UpdateProfileDto,
  UpdateProfileWithFileDto,
} from './dto/request/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { GetCurrentUserDto } from './dto/response/get-current-user.dto';

@ApiTags('user')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' }) // Description for Swagger
  @ApiBody({ type: CreateUserDto }) // Describe the request body
  @UsePipes(UniqueUserPipe)
  @Public()
  async create(@Body() createuser: CreateUserDto): Promise<UserEntity> {
    this.logger.log('Received user data:', createuser);
    return await this.userService.create(createuser);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login a user' }) // Description for Swagger
  @ApiBody({ type: SignInUserDto }) // Describe the request body
  @Public()
  async login(
    @Body() loginuser: SignInUserDto,
  ): Promise<{ access_token: string }> {
    this.logger.log('Received user login data:', loginuser);
    return await this.userService.login(loginuser);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the current user' })
  async getCurrentUser(@Req() req: any): Promise<GetCurrentUserDto> {
    if (!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    this.logger.log('Current user data:', req.user);

    return this.userService.getCurrentUser(req.user.id);
  }

  @Put('/me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('avatarFile', {
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
      },
    } as MulterOptions),
  )
  @ApiBody({
    type: UpdateProfileWithFileDto,
    description: 'User profile data with optional avatar upload',
  })
  async updateCurrentUser(
    @Req() req: any,
    @Body() updateData: UpdateProfileDto,
    @UploadedFile() avatarFile?: any,
  ): Promise<any> {
    if (!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }

    const updatedUser = await this.userService.updateUser(
      req.user.id,
      updateData,
    );
    const updatedProfile = await this.userService.updateProfile(
      req.user.id,
      updateData,
      avatarFile,
    );

    return {
      user: updatedUser,
      profile: updatedProfile,
    };
  }

  @Get()
  @UseGuards(AuthGuard) // Bảo vệ endpoint này bằng AuthGuard
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get list of users' }) // Mô tả cho Swagger
  async getUsers(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Put(':id/toggle-enabled')
  @UseGuards(AuthGuard) // Bảo vệ endpoint này bằng AuthGuard
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle user enabled status' }) // Mô tả cho Swagger
  async toggleUserEnabled(@Param('id') id: number) {
    return await this.userService.toggleUserEnabled(id);
  }

  @Put(':id/role')
  @UseGuards(AuthGuard) // Bảo vệ endpoint này bằng AuthGuard
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user role' }) // Mô tả cho Swagger
  async updateUserRole(
    @Param('id') id: number,
    @Body('role_id') roleId: number,
  ) {
    return await this.userService.updateUserRole(id, roleId);
  }
}
