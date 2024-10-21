import { BaseEntity } from 'src/modules/base/entity/base.entity';
import {Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { MinLength } from 'class-validator';

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

  @Column({ default: 0 })
  point: number;

  @Column({ default: 0 })
  total_submission: number;

  @Column({ default: 1})
  is_enabled: boolean;
}
