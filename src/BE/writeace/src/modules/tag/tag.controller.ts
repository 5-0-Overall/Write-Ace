import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagEntity } from './entity/tag.entity';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('tags')
@ApiTags('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get tag by id' })
  @ApiParam({ name: 'id', description: 'Tag id', example: 1 })
  async getTagById(@Param('id') id: number): Promise<TagEntity> {
    return this.tagService.findTagById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tags' })
  async getAllTag(): Promise<TagEntity[]> {
    return this.tagService.findAllTags();
  }

  @Post()
  @ApiOperation({ summary: 'Get tags by list of ids' })
  @ApiBody({ 
    description: 'List of tag ids', 
    examples: { 
      example1: { value: [1, 2, 3] } 
    } 
  })
  async getTagsByListId(@Body() listId: number[]): Promise<TagEntity[]> {
    return this.tagService.findTagByListId(listId);
  }
}
