import { ProblemEntity } from 'src/modules/problem/entity/problem.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity('tag')
export class TagEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @ManyToMany(() => ProblemEntity, (problem) => problem.tags)
    problems: ProblemEntity[];
}