import { BaseEntity } from 'src/modules/base/entity/base.entity';
import {Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role_id: number;

  @Column()
  point: number;

  @Column()
  total_submission: number;

  @Column()
  is_enabled: boolean;
}
