import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Task } from 'src/modules/const/enum/task.enum';

export class CreateProblemDto {
  @IsNotEmpty()
  @IsEnum(Task)
  task_id: Task;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  image: string;
}
