import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TagEntity } from './entity/tag.entity';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>,
    ) {}

    async findTagById(id: number): Promise<TagEntity> {
        return this.tagRepository.findOne({ where: { id } });
    }
    async findTagByListName(listName: string[]): Promise<TagEntity[]> {
        return this.tagRepository.find({ where: { name: In(listName) } });
    }   
}

