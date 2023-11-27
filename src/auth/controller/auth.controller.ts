import { Controller, Get, Post, Body, Patch, Param, Delete,} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RegistrasiDto } from '../dto/registrasi.dto';
import { LoginAuhDTO } from '../dto/login-auth.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // registrasi user baru
  @Post('auth/register')
  register(@Body() body: RegistrasiDto) {
    return this.authService.create(body);
  }

  // login data user
  @Post('auth/login')
  signIn(@Body() body: LoginAuhDTO) {
    return this.authService.login(body);
  }

  // melihat semua data user
  @Get('user')
  async findAll(): Promise<User[] | null> {
    return await this.authService.findAll();
  }

  // melihat data user berdasarkan userid
  @Get('user/:userid')
  findOne(@Param('userid') userid: string): Promise<User[] | null> {
  return this.authService.findOne(userid);
  }

  // edit data user
  @Patch('user/:userid/edit')
  update(
    @Param('userid') userid: string, 
    @Body() body: UpdateUserDto): Promise<User> {
    return this.authService.update(userid, body);
  }

  // delete data user
  @Delete('user/:userid/delete')
  remove(@Param('userid') userid: string) {
    return this.authService.remove(userid);
  }
}
