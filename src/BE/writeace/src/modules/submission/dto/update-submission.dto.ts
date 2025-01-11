import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { STATUS } from '../../const/enum/status.enum';

export class UpdateSubmissionDto {
  @ApiProperty({ required: false, description: 'Teacher review content' })
  @IsOptional()
  @IsString()
  teacherReview?: string;

  @ApiProperty({ required: false, description: 'Task Achievement score' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  scoreTA?: number;

  @ApiProperty({ required: false, description: 'Coherence and Cohesion score' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  scoreCC?: number;

  @ApiProperty({ required: false, description: 'Lexical Resource score' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  scoreLR?: number;

  @ApiProperty({ required: false, description: 'Grammar Range and Accuracy score' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  scoreGRA?: number;

  @ApiProperty({ required: false, description: 'Overall score' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  scoreOVR?: number;

  @ApiProperty({ required: false, enum: STATUS, description: 'Submission status' })
  @IsOptional()
  @IsEnum(STATUS)
  status?: STATUS;
}
