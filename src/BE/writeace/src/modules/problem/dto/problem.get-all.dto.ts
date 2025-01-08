import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Task } from 'src/modules/const/enum/task.enum';

export class ProblemGetAllDto {
  id: number;

  @IsEnum(Task)
  task_id: Task;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image?: string;
}
