import { Controller, Get, Post, Put, Query, Req } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('notification')
@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Get()
    @ApiOperation({ summary: 'Get notifications' })
    @ApiBearerAuth()
    getNotifications(@Req () req: any) {
        return this.notificationService.getNotifications(req.user.id);
    }

    @Put('read')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Mark notification as read' })
    isRead(@Query('id') id: number) {
        return this.notificationService.isRead(id);
    }
    
}