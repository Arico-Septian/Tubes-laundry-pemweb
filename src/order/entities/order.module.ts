import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controller/order.controller';
import { OrderService } from './service/order.service';
import { Order } from './entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
