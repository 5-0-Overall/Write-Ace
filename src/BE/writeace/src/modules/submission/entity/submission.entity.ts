import { BaseEntity } from 'src/modules/base/entity/base.entity';
import { STATUS } from 'src/modules/const/enum/status.enum';
import { ProblemEntity } from 'src/modules/problem/entity/problem.entity';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('submission')
export class SubmissionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProblemEntity, (problem) => problem.submissions)
  @JoinColumn({ name: 'problem_id' })
  problem: ProblemEntity;

  @ManyToOne(() => UserEntity, (user) => user.submissions)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'ai_review', type: 'text', nullable: true }) // Thêm type và nullable
  aiReview: string;

  @Column({ name: 'teacher_review', type: 'text', nullable: true })
  teacherReview: string;

  @Column({ type: 'text', nullable: false})
  essay: string;

  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.PENDING,
  })
  status: STATUS;

  @Column({ name: 'scoreta', type: 'int', default: 0 }) // Thêm type và sửa tên column
  scoreTA: number;

  @Column({ name: 'scorecc', type: 'int', default: 0 })
  scoreCC: number;

  @Column({ name: 'scorelr', type: 'int', default: 0 })
  scoreLR: number;

  @Column({ name: 'scoregra', type: 'int', default: 0 })
  scoreGRA: number;

  @Column({ name: 'scoreovr', type: 'int', default: 0 })
  scoreOVR: number;
}
