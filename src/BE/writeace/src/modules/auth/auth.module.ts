import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthGuard } from '../guard/auth.guard';
import { JWT_EXPIRATION, JWT_SECRET } from '../const/const';

@Module({
  imports: [
    forwardRef(() => UserModule), // Use forwardRef to avoid circular dependency
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRATION},
    }),
  ],
  providers: [AuthGuard],
  exports: [AuthGuard,JwtModule],
})
export class AuthModule {}