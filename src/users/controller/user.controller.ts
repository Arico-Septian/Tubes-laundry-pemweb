import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // membuat data user
  @Post('user/create')
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  // melihat semua data user
  @Get('user')
  async findAll(): Promise<User[] | null> {
    return await this.userService.findAll();
  }

  // delete data user
  @Delete('user/:userid/delete')
  remove(@Param('orderid') userid: string) {
    return this.userService.remove(userid);
  }

  // edit data user
  @Patch('user/:userid/edit')
  update(
    @Param('userid') userid: string, 
    @Body() body: UpdateUserDto): Promise<User> {
    return this.userService.update(userid, body);
  }

  // melihat data user berdasarkan userid
  @Get('user/:userid')
    findOne(@Param('userid') userid: string): Promise<User[] | null> {
    return this.userService.findOne(userid);
  }
}
