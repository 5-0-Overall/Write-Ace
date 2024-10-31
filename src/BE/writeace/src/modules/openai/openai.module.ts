import { Module } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { OpenAIController } from './openai.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [OpenAIService],
  controllers: [OpenAIController],
  exports: [OpenAIService],
})
export class OpenAIModule {}
