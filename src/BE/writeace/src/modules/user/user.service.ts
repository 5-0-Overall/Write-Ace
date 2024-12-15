import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/request/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from './dto/request/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
import { roleMap } from '../const/enum/roles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
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
    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const role=roleMap.get(user.role_id)
    const payload = { username: user.username, sub: user.id,  role: role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

