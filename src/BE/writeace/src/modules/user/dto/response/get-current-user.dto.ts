import { UserEntity } from '../../entity/user.entity';
import { ProfileEntity } from '../../entity/profile.entity';

export class GetCurrentUserDto {
    id: number;
    username: string;
    email: string;
    avatar: string;
    description: string;
    is_gmail: boolean;
}
  
