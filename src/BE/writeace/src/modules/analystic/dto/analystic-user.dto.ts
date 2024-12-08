import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AnalysticUserDTO {
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  @IsNumber()
  user_id: number;
  @ApiProperty({
    description: 'Total submission',
    example: 1,
  })
  @IsNumber()
  total_submission: number;
  @ApiProperty({
    description: 'Total essay',
    example: 1,
  })
  @IsNumber()
  total_essay: number;
  @ApiProperty({
    description: 'Total word',
    example: 1,
  })
  @IsNumber()
  total_word: number;
  @ApiProperty({
    description: 'Average score',
    example: 1,
  })
  @IsNumber()
  average_score: number;
  @ApiProperty({
    description: 'Highest score',
    example: 1,
  })
  highest_score: number;
}
