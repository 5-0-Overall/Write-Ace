import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UniqueUserPipe } from '../pipes/unique-user.pipe';
import { SignInUserDto } from './dto/request/signin-user.dto';
import { AuthGuard } from '../guard/auth.guard';

@ApiTags('user')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' }) // Description for Swagger
  @ApiBody({ type: CreateUserDto }) // Describe the request body
  @UsePipes(UniqueUserPipe)
  async create(@Body() createuser: CreateUserDto): Promise<UserEntity> {
    this.logger.log('Received user data:', createuser);
    return await this.userService.create(createuser);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login a user' }) // Description for Swagger
  @ApiBody({ type: SignInUserDto }) // Describe the request body
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
  async getCurrentUser(@Req() req: any): Promise<UserEntity> {
    if (!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    this.logger.log('Current user data:', req.user);
    return  req.user as UserEntity;
  }
}
