import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationService } from "./notification.service";
import { Module } from "@nestjs/common";
import { NotificationController } from "./notification.controller";
import { Notification } from "./entity/notification.entity";
@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
  ],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}

