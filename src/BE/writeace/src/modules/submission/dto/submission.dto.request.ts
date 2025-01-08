import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class SubmissionCreateDTO {
  @ApiProperty({ description: 'ID of the problem', example: 1 })
  @IsNotEmpty()
  problem: number;

  @ApiProperty({ description: 'ID of the user', example: 1 })
  @IsNotEmpty()
  user: number;

  @ApiProperty({ description: 'Essay content', example: 'This is a sample essay' })
  @IsNotEmpty()
  essay: string;

  @ApiProperty({ description: 'Base64 image for task 1', required: false })
  @IsOptional()
  imageBase64?: string;
}
