import { Controller, Get, Query } from '@nestjs/common';
import { S3Service } from './s3.service';

@Controller('s3')
export class S3Controller {
    constructor(private readonly s3Service: S3Service) {}

    @Get('signed-url')
    async getSignedUrl(@Query('key') key: string) {
        const signedUrl = await this.s3Service.getSignedUrl(key);
        return { url: signedUrl };
    }
}