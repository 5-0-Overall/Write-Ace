import { Controller, Get, Param } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagEntity } from './entity/tag.entity';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('tags')
@ApiTags('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Get(':id')
    @ApiOperation({ summary: 'Get tag by id' })
    @ApiParam({ name: 'id', description: 'Tag id', example: 1 })
    async getTagById(@Param('id') id: number) : Promise<TagEntity> {
        return this.tagService.findTagById(id);
    }
}
