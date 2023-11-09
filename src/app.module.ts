import { Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { OrderModule } from './order/entities/order.module';


@Module({
  providers: [
    {
      provide: 'APP_PIPE',
      useClass: ValidationPipe
    }
  ],
  imports: [
    DatabaseModule,
    UsersModule, 
    AuthModule, 
    OrderModule,
  ],
})
export class AppModule {}