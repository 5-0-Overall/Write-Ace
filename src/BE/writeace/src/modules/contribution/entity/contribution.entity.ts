import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contributions')
export class ContributionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  count: number;

  @Column()
  date: Date;
}
