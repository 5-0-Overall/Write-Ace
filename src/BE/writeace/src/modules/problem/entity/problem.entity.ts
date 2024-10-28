import { BaseEntity } from 'src/modules/base/entity/base.entity';
import { Task } from 'src/modules/const/enum/task.enum';
import { TagEntity } from 'src/modules/tag/entity/tag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('problem')
export class ProblemEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Task })
  task_id: Task;

  @ManyToMany(() => TagEntity, (tag) => tag.problems, { cascade: true })
  @JoinTable({
    name: 'problem_tag',
    joinColumn: {
      name: 'problem_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: TagEntity[];

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image?: string;
}
