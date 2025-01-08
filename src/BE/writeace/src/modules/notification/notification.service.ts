import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entity/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async getNotifications(user_id: number) {
    return this.notificationRepository.find({
      where: { user_id },
      order: { created_at: 'DESC' },
      take: 10,
    });
  }

  async createNotifications(noti: Notification) {
    return this.notificationRepository.save(noti);
  }

  async isRead(id: number) {
    const noti = await this.notificationRepository.findOne({
      where: {
        id,
      },
    });
    noti.is_read = true;
    return this.notificationRepository.save(noti);
  }
}
