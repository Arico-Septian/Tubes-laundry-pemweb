import { Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { OrderModule } from './order/entities/order.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guard/auth.guard';

@Module({
  providers: [
    {
      provide: 'APP_PIPE',
      useClass: ValidationPipe
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },

  ],
  imports: [
    DatabaseModule,
    UsersModule, 
    AuthModule, 
    OrderModule,
  ],
})
export class AppModule {}