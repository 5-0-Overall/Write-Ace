import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { ExamplePromptTask2 } from '../const/prompt_task2';
import { ExamplePromptTask1 } from '../const/prompt_task1';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async generateText(question: string, essay: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini', // or 'gpt-4-turbo' or another chat model
      messages: [
        { role: 'system', content: ExamplePromptTask2 },
        { role: 'user', content: `Question: ${question} \n Essay: ${essay}` },
      ],
      max_tokens: 4096,
      temperature: 0.5,
    });

    return response.choices[0]?.message?.content.trim() ?? '';
  }

  getScoreTA(aiReview: string): number {
    const scoreTA = JSON.parse(aiReview).feedback.task_response.band_score;
    return scoreTA;
  }

  getScoreCC(aiReview: string): number {
    const scoreCC = JSON.parse(aiReview).feedback.task_response.band_score;
    return scoreCC;
  }

  getScoreLR(aiReview: string): number {
    const scoreLR = JSON.parse(aiReview).feedback.task_response.band_score;
    return scoreLR;
  }

  getScoreGRA(aiReview: string): number {
    const scoreGRA = JSON.parse(aiReview).feedback.task_response.band_score;
    return scoreGRA;
  }

  getScoreOVR(aiReview: string): number {
    return (
      (this.getScoreTA(aiReview) +
        this.getScoreCC(aiReview) +
        this.getScoreLR(aiReview) +
        this.getScoreGRA(aiReview)) /
      4
    );
  }

  async generateTextWithStreaming(
    question: string,
    essay: string,
  ): Promise<string> {
    try {
      const stream = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: ExamplePromptTask2 },
          { role: 'user', content: `Question: ${question}\nEssay: ${essay}` },
        ],
        max_tokens: 4096,
        temperature: 0.5,
        stream: true,
      });

      let fullText = '';
      let lastDisplayedLength = 0;

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          fullText += content;
          // Hiển thị các ký tự mới được thêm vào
          const newChars = fullText.slice(lastDisplayedLength);
          process.stdout.write(newChars); // Hiển thị trên console

          // Hoặc nếu bạn muốn update UI (ví dụ với Angular/React):
          // this.currentText = fullText; // Update biến để binding với UI

          lastDisplayedLength = fullText.length;

          // Tạo delay để có hiệu ứng đánh máy
          await new Promise((resolve) => setTimeout(resolve, 50)); // delay 50ms
        }
      }

      console.log('\nStreaming ended.');
      return 'Streaming ended.';
    } catch (error) {
      console.error('Error during streaming:', error);
      throw error;
    }
  }

  async generateTextWithImage(question: string, essay: string, imageBase64: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { 
          role: 'system', 
          content: ExamplePromptTask1 
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Question: ${question}\nEssay: ${essay}`
            },
            {
              type: 'image_url',
              image_url: {
                url: imageBase64,
                detail: 'high'
              }
            }
          ]
        }
      ],
      max_tokens: 4096,
      temperature: 0.5,
    });

    return response.choices[0]?.message?.content.trim() ?? '';
  }
}
