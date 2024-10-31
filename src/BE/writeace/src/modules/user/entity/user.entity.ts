import { BaseEntity } from 'src/modules/base/entity/base.entity';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { MinLength } from 'class-validator';
import { SubmissionEntity } from 'src/modules/submission/entity/submission.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({nullable: false})
  password: string;

  @Column({ default: 0 })
  role_id: number;

  @OneToMany(()=>SubmissionEntity, (submission)=>submission.user)
  submissions:SubmissionEntity[];

  @Column({ default: 0 })
  point: number;

  @Column({ default: 0 })
  total_submission: number;

  @Column({ default: 1})
  is_enabled: boolean;
}
