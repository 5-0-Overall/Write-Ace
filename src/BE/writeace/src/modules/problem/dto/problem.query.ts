import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';


export class GetProblemsQuery {
    @IsOptional()
    @ApiProperty({ required: false, description: 'Task ID', example: 1 })
    task?: number;

    @IsOptional()
    @ApiProperty({ required: false, description: 'List of tag names', example: 'Bar Chart,Line Graph' })
    tagName?: string;

    @IsOptional()
    @ApiProperty({ required: false, description: 'Limit for results', example: 10 })
    limit?: number;

    @IsOptional()
    @ApiProperty({ required: false, description: 'Offset for results', example: 0 })
    offset?: number;
}