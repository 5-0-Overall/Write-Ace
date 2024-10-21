import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UserEntity } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UniqueUserPipe implements PipeTransform {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  

  async transform(value: any) {
    const { email, username } = value;
    const emailExists = await this.userRepository.findOneBy({ email });
    const usernameExists = await this.userRepository.findOneBy({ username });
    if (emailExists || usernameExists) {
      throw new BadRequestException({
        message: ['Email or Username is already in use.'],
        error: 'Bad Request',
        statusCode: 400,
      });
    }
    return value;
  }
}

export default UniqueUserPipe;