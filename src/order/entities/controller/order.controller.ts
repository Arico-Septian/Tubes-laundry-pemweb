import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards} from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderService } from '../service/order.service';
import { Order } from '../entities/order.entity';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { PenilaianOrderDto } from '../dto/penilaian-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // membuat data order
  @UseGuards(AuthGuard)
  @Post('order/create')
  create(@Body() body: CreateOrderDto) {
    return this.orderService.create(body);
  }

  // melihat semua data order
  @Get('order')
  async findAll(): Promise<Order[] | null> {
    return await this.orderService.findAll();
  }

  // delete data order
  @Delete('order/:orderid/delete')
  remove(@Param('orderid') orderid: string) {
    return this.orderService.remove(orderid);
  }

  // edit data order
  @Patch('order/:orderid/edit')
  update(
    @Param('orderid') orderid: string, 
    @Body() body: UpdateOrderDto): Promise<Order> {
    return this.orderService.update(orderid, body);
  }

  // melihat data order berdasarkan userid
  @Get('order/:userid')
    findOne(@Param('userid') userid: string): Promise<Order[] | null> {
    return this.orderService.findOne(userid);
  }

  // edit data penilaian order
  @Patch('order/:orderid/penilaian')
  updatepenilaian(
    @Param('orderid') orderid: string, 
    @Body() body: PenilaianOrderDto): Promise<Order> {
    return this.orderService.updatepenilaian(orderid, body);
    }
}
