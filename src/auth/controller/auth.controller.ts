import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RegistrasiDto } from '../dto/registrasi.dto';
import { LoginAuhDTO } from '../dto/login-auth.dto';

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
}
