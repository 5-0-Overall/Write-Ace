import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'username01',
  })
  @IsNotEmpty({ message: 'Username is required' })
  username: string;


  @ApiProperty({
    description: 'The email of the user',
    example: 'user01@gmail.com',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password01',
  })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password: string;

}

