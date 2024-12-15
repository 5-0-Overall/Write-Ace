import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse, ApiProperty } from '@nestjs/swagger';

export class OpenAIResponse {
  text: string;
}

@ApiTags('OpenAI')
@Controller('openai')
export class OpenAIController {
  constructor(private readonly openAIService: OpenAIService) {}

  @ApiOperation({ summary: 'Generate text from OpenAI based on question and essay' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        question: { type: 'string', description: 'The question to base the response on', example: 'What are the benefits of exercise?' },
        essay: { type: 'string', description: 'The essay content to evaluate or discuss', example: 'Exercise has numerous benefits, including improving mood, health, and longevity.' },
      },
    },
  })
  @Post('generate')
  async generateText(@Body() body: { question: string; essay: string }): Promise<string> {
    const { question, essay } = body;
    if (!question || !essay) {
      throw new Error("Both 'question' and 'essay' fields are required.");
    }
    const text = await this.openAIService.generateText(question, essay);
    return text;
  }
}

