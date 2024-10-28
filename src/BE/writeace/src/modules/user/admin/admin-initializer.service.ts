import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminInitializerService implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    const retryAttempts = this.configService.get('DATABASE_RETRY_ATTEMPTS', 10);
    const retryDelay = this.configService.get('DATABASE_RETRY_DELAY', 3000);
    
    for (let attempt = 1; attempt <= retryAttempts; attempt++) {
      try {
        console.log(`[AdminInitializer] Attempt ${attempt}/${retryAttempts} to initialize admin user...`);
        await this.initializeAdminUser();
        console.log('[AdminInitializer] Successfully initialized admin user');
        return;
      } catch (error) {
        console.error(`[AdminInitializer] Attempt ${attempt} failed:`, error.message);
        
        if (attempt === retryAttempts) {
          console.error('[AdminInitializer] Max retries reached. Failed to initialize admin user.');
          throw error;
        }

        console.log(`[AdminInitializer] Waiting ${retryDelay}ms before next attempt...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }

  private async initializeAdminUser() {
    try {
      // Kiểm tra kết nối database
      await this.userRepository.query('SELECT 1');
      
      const adminUser = await this.userRepository.findOne({
        where: { username: 'admin' }
      });

      if (!adminUser) {
        console.log('[AdminInitializer] Admin user not found. Creating...');
        const newAdmin = await this.userService.create({
          username: 'admin',
          email: 'admin@gmail.com',
          password: 'admin123456',
        });

        // Đảm bảo newAdmin có id trước khi update
        if (!newAdmin || !newAdmin.id) {
          throw new Error('Failed to create admin user - no ID returned');
        }

        await this.userRepository.update(newAdmin.id, { role_id: 1 });
        console.log('[AdminInitializer] Admin user created successfully with ID:', newAdmin.id);
      } else {
        console.log('[AdminInitializer] Admin user already exists with ID:', adminUser.id);
      }
    } catch (error) {
      console.error('[AdminInitializer] Error in initializeAdminUser:', error.message);
      throw error;
    }
  }
}