import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'username01',
  })
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password01',
  })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
