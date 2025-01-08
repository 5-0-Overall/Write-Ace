import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/request/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from './dto/request/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
import { roleMap } from '../const/enum/roles.enum';
import { ProfileEntity } from './entity/profile.entity';
import { UpdateProfileDto } from './dto/request/update-user.dto';
import { S3Service } from '../s3/s3.service';
import { GetCurrentUserDto } from './dto/response/get-current-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    private readonly jwtService: JwtService,
    private readonly s3Service: S3Service,
  ) {}
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
  async create(user: CreateUserDto): Promise<UserEntity> {
    const hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;
    return await this.userRepository.save(user);
  }
  async login(loginData: SignInUserDto): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({
      where: { username: loginData.username },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const role = roleMap.get(user.role_id);
    const payload = { username: user.username, sub: user.id, role: role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async updateProfile(
    userId: number,
    profile: UpdateProfileDto,
    avatarFile?: any,
  ): Promise<ProfileEntity> {
    let profileUser = await this.profileRepository.findOne({
      where: { user_id: userId },
    });

    if (!profileUser) {
      profileUser = new ProfileEntity();
      profileUser.user_id = userId;
    }

    if (avatarFile) {
      const avatarUrl = await this.s3Service.uploadFile(avatarFile, 'avatars');
      profileUser.avatar = avatarUrl;
    } else if (profile.avatar) {
      profileUser.avatar = profile.avatar;
    }

    if (profile.description) {
      profileUser.description = profile.description;
    }

    return await this.profileRepository.save(profileUser);
  }

  async updateUser(
    userId: number,
    updateData: UpdateProfileDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (updateData.email) {
      user.email = updateData.email;
    }
    if (updateData.password) {
      user.password = await bcrypt.hash(updateData.password, 10);
    }

    return await this.userRepository.save(user);
  }

  async getCurrentUser(userId: number): Promise<GetCurrentUserDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    let profile = await this.profileRepository.findOne({
      where: { user_id: userId },
    });
    if (!profile) {
      profile = new ProfileEntity();
      profile.user_id = userId;
    }

    const currentUser: GetCurrentUserDto = {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar:
        profile.avatar ||
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqgGApOABX6L1KTXg0XzCOQgvFzieFvdK3rw&s',
      description: profile.description || 'Try hard to be a good writer',
      is_gmail: profile.is_gmail || false,
    };

    return currentUser;
  }

  async toggleUserEnabled(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User  not found');
    }

    user.is_enabled = !user.is_enabled; // Toggle trạng thái
    return await this.userRepository.save(user); // Lưu thay đổi
  }

  async updateUserRole(userId: number, roleId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User  not found');
    }

    if (![0, 1, 2].includes(roleId)) {
      throw new Error('Invalid role ID. Must be 0, 1, or 2.');
    }

    user.role_id = roleId;
    return await this.userRepository.save(user);
  }
}
