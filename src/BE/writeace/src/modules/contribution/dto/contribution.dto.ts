import { IsDate, IsNumber } from 'class-validator';

export class ContributionDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  count: number;

  @IsDate()
  date: Date;
}