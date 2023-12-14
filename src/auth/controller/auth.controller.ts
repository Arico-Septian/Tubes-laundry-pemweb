import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RegistrasiDto } from '../dto/registrasi.dto';
import { LoginAuhDTO } from '../dto/login-auth.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import Serialize from 'src/interceptors/serialize.interceptor';
import { UserDTO } from 'src/users/dto/user.dto';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { Public } from 'src/decorators/public.decorator';


@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Roles(Role.Admin)
  @Serialize(UserDTO)
  @Post('auth/register/admin')
  async registerAdmin(@Body() body: CreateUserDTO): Promise<User> {
    return await this.authService.createAdmin(body)
  }

  // route for make user with role moderator
  @Serialize(UserDTO)
  @Roles(Role.Admin)
  @Post('auth/register/moderator')
  async registerModerator(@Body() body: CreateUserDTO): Promise<User> {
    return await this.authService.createModerator(body)
  }

  // registrasi user baru
  @Public()
  @Post('auth/register')
  register(@Body() body: RegistrasiDto) {
    return this.authService.create(body);
  }

  // login data user
  @Public()
  @Post('auth/login')
  signIn(@Body() body: LoginAuhDTO) {
    return this.authService.login(body);
  }

  // update data user
  @Public()
  @Patch('user/:userid/update')
  update(
    @Param('userid') userid: string, 
    @Body() body: UpdateUserDto): Promise<User> {
    return this.authService.update(userid, body);
  }

  // melihat data user berdasarkan userid
  @Get('user/:userid')
  findOne(@Param('userid') userid: string): Promise<User[] | null> {
  return this.authService.findOne(userid);
  }
}
